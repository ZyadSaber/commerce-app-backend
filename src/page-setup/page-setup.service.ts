import { Injectable, ForbiddenException } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaManageService } from './../prisma-manage/prisma-manage.service';

@Injectable()
export class PageSetupService {
  constructor(private prisma: PrismaManageService) {}

  async getPageSetupData(dto) {
    try {
      const { page_step, current_page } = dto;
      const skip = (+current_page - 1) * +page_step;

      const [pagesData, total_records] = await Promise.all([
        this.prisma.app_pages.findMany({
          skip,
          take: +page_step,
          orderBy: {
            page_id: 'asc',
          },
        }),
        this.prisma.app_pages.count(),
      ]);

      const data = pagesData.map((record) => {
        const { created_at, updated_at } = record;
        const obj = {
          ...record,
          created_at: format(created_at, 'yyyy-MM-dd hh:mm aa'),
          updated_at: format(updated_at, 'yyyy-MM-dd hh:mm aa'),
        };
        return obj;
      });
      return { total_records, data };
    } catch (error) {
      throw new ForbiddenException({
        response: 'error',
        message: error,
      });
    }
  }

  async getPagePrivilege(params) {
    const { page_link, user_name } = params;

    const userPermissions = await this.prisma.user_permissions.findFirst({
      where: {
        users: {
          user_name,
        },
        app_pages: {
          page_link,
        },
      },
      select: {
        can_add: true,
        can_edit: true,
        can_delete: true,
        can_print: true,
        can_update_history: true,
        page_id: true,
      },
    });

    const appPages = await this.prisma.app_pages.findFirst({
      where: {
        page_link,
      },
      select: {
        modal_width: true,
        pagination: true,
        refresh_time_out: true,
      },
    });

    return { ...appPages, ...userPermissions };
  }

  async postPageSetupData(params) {
    const { query_status, page_id } = params;

    if (query_status === 'n') {
      try {
        delete params.query_status;
        await this.prisma.app_pages.create({
          data: params,
        });
        return { response: 'success' };
      } catch (error) {
        new ForbiddenException({
          response: 'error',
          message: error,
        });
      }
    } else if (query_status === 'u') {
      // delete params.query_status;
      // delete params.page_id;
      try {
        await this.prisma.app_pages.update({
          where: {
            page_id,
          },
          data: params,
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
        await this.prisma.app_pages.delete({
          where: {
            page_id,
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
}
