import { Injectable, ForbiddenException } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaManageService } from './../prisma-manage/prisma-manage.service';
import { linkedLabelsPages, PostLabelsTableDataType } from './interface';

@Injectable()
export class SystemLabelsService {
  constructor(private prisma: PrismaManageService) {}

  async getLabelsTableData() {
    try {
      const labelsData = await this.prisma.labels.findMany({
        orderBy: {
          updated_at: 'asc',
        },
      });
      const response = labelsData.map((record) => {
        const { created_at, updated_at } = record;
        const obj = {
          ...record,
          created_at: format(created_at, 'yyyy-MM-dd hh:mm aa'),
          updated_at: format(updated_at, 'yyyy-MM-dd hh:mm aa'),
        };
        return obj;
      });

      return {
        data: response,
      };
    } catch (error) {
      throw new ForbiddenException({
        response: 'error',
        message: error,
      });
    }
  }

  async getLinkedLabelsPage(params: { label_id: string }) {
    const { label_id } = params;
    try {
      if (label_id) {
        const pages = await this.prisma.app_pages.findMany({
          select: {
            eng_page_name: true,
            arab_page_name: true,
            page_id: true,
          },
        });

        const components = await this.prisma.app_components.findMany({
          select: {
            component_name: true,
            component_id: true,
          },
        });

        const linkedLabels = await this.prisma.labels_linked_pages.findMany({
          where: {
            label_id,
          },
        });

        const responseData = () => {
          const linkedPages = linkedLabels
            .map(({ page_id }) => page_id)
            .filter((id) => id !== null);
          const linkedcomponents = linkedLabels
            .map(({ component_id }) => component_id)
            .filter((id) => id !== null);

          const computedPages = pages.map(
            ({ page_id, eng_page_name, arab_page_name }) => {
              const obj = {
                page_id,
                label_id,
                linked_id: `page_id_${page_id}`,
                linked_name: `${eng_page_name} / ${arab_page_name}`,
                status: linkedPages.includes(page_id),
              };
              return obj;
            },
          );

          const computedComponents = components.map(
            ({ component_id, component_name }) => {
              const obj = {
                component_id,
                label_id,
                linked_id: `component_id_${component_id}`,
                linked_name: component_name,
                status: linkedcomponents.includes(component_id),
              };
              return obj;
            },
          );

          return [...computedPages, ...computedComponents];
        };

        return {
          data: responseData(),
        };
      } else {
        return {
          data: [],
        };
      }
    } catch (error) {
      throw new ForbiddenException({
        response: 'error',
        message: error,
      });
    }
  }

  async postLinkedLabelsPage(dto: linkedLabelsPages[]) {
    try {
      dto.map(async (record) => {
        const { label_id, page_id, component_id, status } = record;
        if (status) {
          await this.prisma.labels_linked_pages.create({
            data: {
              label_id,
              page_id: +page_id,
              component_id: +component_id,
            },
          });
        } else {
          await this.prisma.labels_linked_pages.deleteMany({
            where: {
              label_id,
              OR: [{ page_id: +page_id }, { component_id: +component_id }],
            },
          });
        }
      });
    } catch (error) {
      throw new ForbiddenException({
        response: 'error',
        message: error,
      });
    }
  }

  async getLinkedLabels(params: {
    page_name?: string;
    component_name?: string;
    p_language: number | string;
  }) {
    const { page_name, component_name, p_language } = params;
    try {
      const responseObj: Record<string, string> = {};
      const linkedLabels = await this.prisma.labels_linked_pages.findMany({
        where: {
          OR: [
            {
              app_pages: {
                page_link: page_name || undefined,
              },
            },
            {
              app_components: {
                component_name: component_name || undefined,
              },
            },
          ],
        },
        select: {
          label_id: true,
          labels: {
            select: {
              eng_label: +p_language === 1,
              arab_label: +p_language === 2,
            },
          },
        },
      });

      linkedLabels.map((record) => {
        const { label_id, labels } = record;
        const { eng_label, arab_label } = labels;

        responseObj[label_id] = +p_language === 1 ? eng_label : arab_label;
      });

      return responseObj;
    } catch (error) {
      throw new ForbiddenException({
        response: 'error',
        message: error,
      });
    }
  }

  async postLabelsTableData(dto: PostLabelsTableDataType) {
    const { query_status, label_id, eng_label, arab_label } = dto;
    if (query_status === 'n') {
      try {
        await this.prisma.labels.create({
          data: {
            label_id,
            eng_label,
            arab_label,
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
        await this.prisma.labels.update({
          where: {
            label_id,
          },
          data: {
            eng_label,
            arab_label,
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
        await this.prisma.labels_linked_pages.deleteMany({
          where: {
            label_id,
          },
        });
        await this.prisma.labels.delete({
          where: {
            label_id,
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
    } else {
      throw new ForbiddenException({
        response: 'error',
        message: 'error in json',
      });
    }
  }
}
