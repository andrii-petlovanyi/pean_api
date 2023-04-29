import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ProjectsDto } from '@src/common/projects/dto/projects.dto';
import { PrismaService } from '@src/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async projectsList() {
    const projects = await this.prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        images: true,
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

  async addProject(files: Express.Multer.File[], dto: ProjectsDto) {
    const imagesUrl = await this.cloudinaryService.uploadImages(
      files,
      ProjectsService.name,
    );

    const project = await this.prisma.project.create({
      data: {
        id: uuidv4(),
        ...dto,
        images: [...imagesUrl],
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

  async updateProject(projectId: string, dto: ProjectsDto) {
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
