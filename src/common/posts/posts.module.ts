import { Module } from '@nestjs/common';

import { PostsService } from '@src/common/posts/posts.service';
import { PostsController } from '@src/common/posts/posts.controller';
import { PrismaService } from '@src/prisma.service';
import { CloudinaryModule } from '@src/common/cloudinary/cloudinary.module';
import { ImageEditorService } from '../image-editor/image-editor.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [PostsController],
  providers: [PostsService, PrismaService, ImageEditorService],
})
export class PostsModule {}
