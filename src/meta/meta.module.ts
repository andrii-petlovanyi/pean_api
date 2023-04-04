import { Module } from '@nestjs/common';
import { MetaService } from './meta.service';
import { MetaController } from './meta.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MetaController],
  providers: [MetaService, PrismaService],
})
export class MetaModule {}
