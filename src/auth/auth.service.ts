import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { format } from 'date-fns';
import * as argon from 'argon2';
import { PrismaManageService } from './../prisma-manage/prisma-manage.service';
import { signInType, UserPermissionType } from './interface';

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
        user_name: user.user_name,
        firs_name: user.first_name,
        last_name: user.last_name,
        build_number: this.config.get('BUILD_NUMBER'),
        p_language: user.language,
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
              page_disabled: false,
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

  async getUsersData(dto: {
    user_name: string;
    page_step: number;
    current_page: number;
  }) {
    const { user_name, page_step, current_page } = dto;
    const skip = (+current_page - 1) * +page_step;

    const [users, total_records] = await Promise.all([
      this.prisma.users.findMany({
        skip,
        take: +page_step,
        orderBy: {
          user_id: 'asc',
        },
        where: {
          user_name: {
            contains: user_name || undefined,
          },
        },
        select: {
          user_id: true,
          created_at: true,
          updated_at: true,
          user_name: true,
          first_name: true,
          last_name: true,
          language: true,
          status: true,
        },
      }),
      this.prisma.users.count(),
    ]);

    const data = users.map((record) => {
      const { created_at, updated_at, language } = record;
      const obj = {
        ...record,
        created_at: format(created_at, 'yyyy-MM-dd hh:mm aa'),
        updated_at: format(updated_at, 'yyyy-MM-dd hh:mm aa'),
        language_name: language === 1 ? 'English' : 'العربية',
      };
      return obj;
    });

    return { total_records, data };
  }

  async getPagesPermission(dto: { user_id: string }) {
    try {
      const { user_id } = dto;
      const page_permissions = await this.prisma.user_permissions.findMany({
        orderBy: {
          user_permissions_id: 'asc',
        },
        where: {
          user_id: +user_id,
        },
        include: {
          app_pages: {
            select: {
              with_add: true,
              with_edit: true,
              with_delete: true,
              with_print: true,
              with_update_history: true,
              arab_page_name: true,
              eng_page_name: true,
              page_link: true,
            },
          },
        },
      });

      const data = page_permissions.map((record) => {
        const {
          app_pages,
          user_permissions_id,
          page_id,
          status,
          can_add,
          can_edit,
          can_delete,
          can_print,
          can_update_history,
        } = record;
        const {
          with_add,
          with_edit,
          with_delete,
          with_print,
          with_update_history,
          // arab_page_name,
          eng_page_name,
          page_link,
        } = app_pages;
        const obj = {
          user_permissions_id,
          page_id,
          status,
          page_name: eng_page_name,
          page_link,
          page_permissions: {
            can_add,
            can_edit,
            can_delete,
            can_print,
            can_update_history,
          },
        };

        !with_add && delete obj.page_permissions.can_add;
        !with_edit && delete obj.page_permissions.can_edit;
        !with_delete && delete obj.page_permissions.can_delete;
        !with_print && delete obj.page_permissions.can_print;
        !with_update_history && delete obj.page_permissions.can_update_history;

        return obj;
      });

      return {
        data,
      };
    } catch (error) {
      return {
        data: [],
      };
    }
  }

  async postPagesPermission(dto: UserPermissionType[]) {
    try {
      if (dto.length !== 0) {
        dto.map(async (record) => {
          const { user_permissions_id, status, page_permissions } = record;
          const { can_add, can_delete, can_edit, can_print } =
            page_permissions || {};

          await this.prisma.user_permissions.update({
            where: {
              user_permissions_id,
            },
            data: {
              status,
              can_add,
              can_delete,
              can_edit,
              can_print,
            },
          });
        });
        return {
          response: 'success',
        };
      } else {
        throw new ForbiddenException('Invalid Data');
      }
    } catch (error) {
      throw error;
    }
  }

  async postUserData(dto: any) {
    const {
      user_id,
      user_name,
      first_name,
      last_name,
      password,
      query_status,
    } = dto;
    const passwordHash = await argon.hash(password || '');
    if (query_status === 'n') {
      try {
        await this.prisma.users.create({
          data: {
            user_name,
            first_name,
            last_name,
            user_password: passwordHash,
          },
        });
        return { response: 'success' };
      } catch (error) {
        new ForbiddenException({
          response: 'error',
          message: error,
        });
      }
    } else if (query_status === 'u') {
      try {
        await this.prisma.users.update({
          where: {
            user_id,
          },
          data: {
            user_name,
            first_name,
            last_name,
            // user_password: passwordHash,
          },
        });
        return { response: 'success' };
      } catch (error) {
        new ForbiddenException({
          response: 'error',
          message: error,
        });
      }
    } else if (query_status === 'd') {
      try {
        await this.prisma.user_permissions.deleteMany({
          where: {
            user_id: +user_id,
          },
        });

        await this.prisma.users.delete({
          where: {
            user_id,
          },
        });

        return { response: 'success' };
      } catch (error) {
        new ForbiddenException({
          response: 'error',
          message: error,
        });
      }
    } else {
      new ForbiddenException({
        response: 'error',
        message: 'error with the JSON',
      });
    }
  }

  async validateUserToPage(params) {
    const { user_name, path_name } = params;

    try {
      const { status } = await this.prisma.user_permissions.findFirst({
        where: {
          AND: [
            {
              users: {
                user_name,
              },
            },
            {
              app_pages: {
                page_link: path_name,
              },
            },
          ],
        },
      });
      return { have_permission: status ? status : false };
    } catch (error) {
      new ForbiddenException({
        response: 'error',
        message: error,
      });
    }
  }
}
