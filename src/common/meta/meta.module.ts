import { Module } from '@nestjs/common';

import { MetaService } from '@src/common/meta/meta.service';
import { MetaController } from '@src/common/meta/meta.controller';
import { PrismaService } from '@src/prisma.service';

@Module({
  controllers: [MetaController],
  providers: [MetaService, PrismaService],
})
export class MetaModule {}
