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
        description: true,
        images: true,
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

  async addProject(files: Express.Multer.File[], dto: ProjectsDto) {
    const optimizedImages = await Promise.allSettled(
      files.map((file) => this.imageService.cropAndConvertToWebp(file.buffer)),
    );

    const projectsImages = optimizedImages.reduce(
      (acc, result, index) => {
        if (result.status === 'rejected') {
          console.error(`Failed to optimize image ${index}:`, result.reason);
          return acc;
        }

        const updatedImage = Object.assign({}, files[index], {
          buffer: Buffer.from(result.value.buffer),
        });

        acc.updatedImages.push(updatedImage);

        return acc;
      },
      { updatedImages: [] },
    );

    const imagesUrls = await this.cloudinaryService.uploadImages(
      projectsImages.updatedImages,
      ProjectsService.name,
    );

    const project = await this.prisma.project.create({
      data: {
        id: uuidv4(),
        ...dto,
        images: imagesUrls,
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
