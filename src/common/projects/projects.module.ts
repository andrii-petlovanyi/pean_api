import { Module } from '@nestjs/common';

import { ProjectsService } from '@src/common/projects/projects.service';
import { ProjectsController } from '@src/common/projects/projects.controller';
import { PrismaService } from '@src/prisma.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImageEditorService } from '../image-editor/image-editor.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, ImageEditorService],
})
export class ProjectsModule {}
