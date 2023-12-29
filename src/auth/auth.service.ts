import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaManageService } from './../prisma-manage/prisma-manage.service';
import { signInType } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaManageService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(userInfo: signInType) {
    const { user_name, password } = userInfo;

    try {
      const user = await this.prisma.users.findUnique({
        where: {
          user_name,
        },
      });

      const pwMatch = await argon.verify(user.user_password, password);

      if (!pwMatch) {
        throw new ForbiddenException('Incorrect user_name or password');
      }

      const payload = { sub: user.user_id, username: user.user_name };

      return {
        response: 'success',
        access_token: await this.jwtService.signAsync(payload),
        user_name: user.first_name,
        build_number: this.config.get('BUILD_NUMBER'),
      };
    } catch (error) {
      throw new ForbiddenException('Incorrect user_name or password');
    }
  }

  async getUserPage(dto: { user_name: string }) {
    const data = await this.prisma.user_permissions.findMany({
      where: {
        AND: [
          {
            users: {
              user_name: dto.user_name,
            },
          },
          {
            app_pages: {
              page_disabled: 'N',
            },
          },
          { status: true },
        ],
      },
      select: {
        app_pages: {
          select: {
            page_id: true,
            arab_page_name: true,
            eng_page_name: true,
            page_link: true,
            page_disabled: true,
            page_icon: true,
            run_in_modal: true,
            page_parent: {
              select: {
                page_parent_id: true,
                eng_page_parent_name: true,
                arab_page_parent_name: true,
                hidden: true,
              },
            },
          },
        },
      },
    });

    let computedData = [];

    data.map((e) => {
      computedData.push({
        page_parent_id: e.app_pages.page_parent.page_parent_id,
        page_parent_name: e.app_pages.page_parent.eng_page_parent_name,
        app_pages: [],
      });
    });

    computedData = computedData.filter((obj, index) => {
      return (
        index ===
        computedData.findIndex((o) => obj.page_parent_id === o.page_parent_id)
      );
    });

    computedData.sort((a, b) => a.page_parent_id - b.page_parent_id);

    computedData.map((e, index) => {
      data.map((p) => {
        if (p.app_pages.page_parent.page_parent_id === e.page_parent_id) {
          computedData[index].app_pages.push({
            page_disabled: p.app_pages.page_disabled,
            page_name: p.app_pages.eng_page_name,
            page_icon: p.app_pages.page_icon,
            page_link: `${p.app_pages.page_link}`,
            run_in_modal: p.app_pages.run_in_modal,
            page_id: p.app_pages.page_id,
          });
        }
      });
    });

    return computedData;
  }
}
