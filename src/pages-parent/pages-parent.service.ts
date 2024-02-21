import { Injectable, ForbiddenException } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaManageService } from './../prisma-manage/prisma-manage.service';
import { PostParentsData } from './interface';

@Injectable()
export class PagesParentService {
  constructor(private prisma: PrismaManageService) {}

  async getParentsTableData(params) {
    const { page_step, current_page } = params;

    try {
      const skip = (+current_page - 1) * +page_step;
      const [labelsData, total_records] = await Promise.all([
        this.prisma.page_parent.findMany({
          skip,
          take: +page_step,
          orderBy: {
            page_parent_index: 'asc',
          },
        }),
        this.prisma.page_parent.count(),
      ]);

      const data = labelsData.map((record) => {
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

  async postParentsTableData(dto: PostParentsData) {
    const {
      query_status,
      arab_page_parent_name,
      eng_page_parent_name,
      hidden,
      page_parent_id,
      page_parent_index
    } = dto;
    if (query_status === 'n') {
      try {
        await this.prisma.page_parent.create({
          data: {
            arab_page_parent_name,
            eng_page_parent_name,
            hidden,
            page_parent_index
          },
        });
        return {
          response: 'success',
        };
      } catch (error) {
        throw new ForbiddenException({
          response: 'error',
          message: error,
        });
      }
    } else if (query_status === 'u') {
      try {
        await this.prisma.page_parent.update({
          where: {
            page_parent_id,
          },
          data: {
            arab_page_parent_name,
            eng_page_parent_name,
            hidden,
            page_parent_id,
            page_parent_index
          },
        });
        return {
          response: 'success',
        };
      } catch (error) {
        throw new ForbiddenException({
          response: 'error',
          message: error,
        });
      }
    } else if (query_status === 'd') {
      try {
        await this.prisma.page_parent.delete({
          where: {
            page_parent_id,
          },
        });
        return {
          response: 'success',
        };
      } catch (error) {
        throw new ForbiddenException({
          response: 'error',
          message: error,
        });
      }
    }
  }

  async getParentsList({ p_language }) {
    const data = await this.prisma.page_parent.findMany({
      select: {
        page_parent_id: true,
        eng_page_parent_name: +p_language === 1 ? true : false,
        arab_page_parent_name: +p_language === 2 ? true : false,
      },
    });
    const response = data.map(
      ({ page_parent_id, eng_page_parent_name, arab_page_parent_name }) => ({
        value: page_parent_id,
        label: +p_language === 1 ? eng_page_parent_name : arab_page_parent_name,
      }),
    );
    return response;
  }
}
