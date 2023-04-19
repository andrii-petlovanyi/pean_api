import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '@src/prisma.service';
import { MetaDto } from '@src/common/meta/dto/meta.dto';


@Injectable()
export class MetaService {
  constructor(private readonly prisma: PrismaService) {}

  async metaList(page: string) {
    const meta = await this.prisma.meta.findUnique({
      where: {
        page,
      },
    });

    if (!meta) throw new NotFoundException(`Meta for page: ${page} not found`);

    return {
      meta,
    };
  }

  async addMeta(dto: MetaDto) {
    const meta = await this.prisma.meta.create({
      data: {
        id: uuidv4(),
        ...dto,
      },
    });

    if (!meta)
      throw new BadRequestException(
        `Meta for page: ${dto.page} is exist, please update them`,
      );

    return {
      message: 'Meta for page added successfully',
      meta,
    };
  }

  async deleteMeta(metaId: string) {
    const meta = await this.prisma.meta.delete({
      where: {
        id: metaId,
      },
    });

    if (!meta) throw new NotFoundException(`Meta with id: ${metaId} not found`);

    return {
      message: `Meta with id: ${metaId} has been deleted`,
    };
  }

  async updateMeta(metaId: string, dto: MetaDto) {
    const meta = await this.prisma.meta.findUnique({
      where: {
        id: metaId,
      },
    });

    if (!meta) {
      throw new NotFoundException(`Meta for page ${dto.page} not found`);
    }

    const updatedMeta = await this.prisma.meta.update({
      where: {
        id: metaId,
      },
      data: dto,
    });

    return {
      message: 'Meta updated successfully',
      post: updatedMeta,
    };
  }
}
