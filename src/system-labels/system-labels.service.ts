import { Injectable, ForbiddenException } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaManageService } from './../prisma-manage/prisma-manage.service';
import { linkedLabelsPages } from './interface';

@Injectable()
export class SystemLabelsService {
  constructor(private prisma: PrismaManageService) {}

  async getLabelsTableData() {
    try {
      const labelsData = await this.prisma.labels.findMany({
        orderBy: {
          label_id: 'asc',
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
          const existingLinkedLabel =
            await this.prisma.labels_linked_pages.findMany({
              where: {
                label_id,
                OR: [{ page_id: +page_id }, { component_id: +component_id }],
              },
            });
          if (existingLinkedLabel.length === 0) {
            await this.prisma.labels_linked_pages.create({
              data: {
                label_id,
                page_id: +page_id,
                component_id: +component_id,
              },
            });
          }
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
  }) {}
}
