import { Module } from '@nestjs/common';

import { PostsService } from '@src/common/posts/posts.service';
import { PostsController } from '@src/common/posts/posts.controller';
import { PrismaService } from '@src/prisma.service';
import { CloudinaryModule } from '@src/common/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
