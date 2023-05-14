import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import {
  ProjectsDto,
  UpdateProjectsDto,
} from '@src/common/projects/dto/projects.dto';
import { PrismaService } from '@src/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ImageEditorService } from '../image-editor/image-editor.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
    private imageService: ImageEditorService,
  ) {}

  async projectsList() {
    const projects = await this.prisma.project.findMany({
      select: {
        id: true,
        title: true,
        img_placeholder: true,
        createdAt: true,
      },
    });

    return projects;
  }

  async projectsSitemapRoute() {
    return await this.prisma.project.findMany({
      select: {
        id: true,
      },
    });
  }

  async projectById(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project)
      throw new NotFoundException(`Project with id: ${projectId} not found`);

    return project;
  }

  async addProject(file: Express.Multer.File, dto: ProjectsDto) {
    const optimizedImage = await this.imageService.cropAndConvertToWebp(
      file.buffer,
    );

    const updatedImage = Object.assign({}, file, {
      buffer: Buffer.from(optimizedImage.buffer),
    });

    const imageUrl = await this.cloudinaryService.uploadOneImage(
      updatedImage,
      ProjectsService.name,
    );

    const project = await this.prisma.project.create({
      data: {
        id: uuidv4(),
        ...dto,
        img_placeholder: imageUrl,
      },
    });

    return {
      message: 'Project added successfully',
      project,
    };
  }

  async deleteProject(projectId: string) {
    const project = await this.prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    if (!project)
      throw new NotFoundException(`Project with id: ${projectId} not found`);

    return {
      message: `Project with id: ${projectId} has been deleted`,
    };
  }

  //TODO: need also update images
  async updateProject(projectId: string, dto: UpdateProjectsDto) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    const updatedProject = await this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: dto,
    });

    return {
      message: 'Project updated successfully',
      post: updatedProject,
    };
  }
}
