import { Module } from '@nestjs/common';

import { ProjectsService } from '@src/common/projects/projects.service';
import { ProjectsController } from '@src/common/projects/projects.controller';
import { PrismaService } from '@src/prisma.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
})
export class ProjectsModule {}
