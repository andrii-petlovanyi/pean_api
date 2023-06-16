import { CACHE_MANAGER, CacheModule, Module } from '@nestjs/common';

import { PostsService } from '@src/common/posts/posts.service';
import { PostsController } from '@src/common/posts/posts.controller';
import { PrismaService } from '@src/prisma.service';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    PrismaService,
    { provide: CACHE_MANAGER, useClass: CacheModule },
  ],
})
export class PostsModule {}
