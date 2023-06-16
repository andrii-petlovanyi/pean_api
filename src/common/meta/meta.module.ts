import { CACHE_MANAGER, CacheModule, Module } from '@nestjs/common';

import { MetaService } from '@src/common/meta/meta.service';
import { MetaController } from '@src/common/meta/meta.controller';
import { PrismaService } from '@src/prisma.service';

@Module({
  controllers: [MetaController],
  providers: [
    MetaService,
    PrismaService,
    { provide: CACHE_MANAGER, useClass: CacheModule },
  ],
})
export class MetaModule {}
