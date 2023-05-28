import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import {
  ProjectsDto,
  UpdateProjectsDto,
} from '@src/common/projects/dto/projects.dto';
import { PrismaService } from '@src/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ImageEditorService } from '../image-editor/image-editor.service';
import { constants } from '@src/config/cloudinary.config';
import slugify from 'slugify';

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
        slug: true,
        createdAt: true,
      },
    });

    return projects;
  }

  async projectsSitemapRoutes() {
    return await this.prisma.project.findMany({
      select: {
        id: true,
        slug: true,
      },
    });
  }

  async projectById(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        album: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!project)
      throw new NotFoundException(`Project with id: ${projectId} not found`);

    return project;
  }

  async addProject(file: Express.Multer.File, dto: ProjectsDto) {
    const slug = slugify(dto.title, { lower: true, strict: true });
    const optimizedImage = await this.imageService.cropAndConvertToWebp(file);

    const imageUrl = await this.cloudinaryService.uploadOneImage(
      optimizedImage,
      dto.title,
    );

    const project = await this.prisma.project.create({
      data: {
        id: uuidv4(),
        ...dto,
        slug,
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

  async updateProject(
    projectId: string,
    file: Express.Multer.File,
    dto: UpdateProjectsDto,
  ) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    const slug = dto.title
      ? slugify(dto.title, { lower: true, strict: true })
      : project.slug;

    const updatedImageUrl = file
      ? await this.cloudinaryService.updateOneImage(
          file,
          project.img_placeholder,
          constants.PROJECTS_PLACEHOLDERS,
        )
      : undefined;

    const updatedProject = await this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...dto,
        slug,
        img_placeholder: updatedImageUrl || project.img_placeholder,
      },
    });

    return {
      message: 'Project updated successfully',
      post: updatedProject,
    };
  }
}
