import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsDto } from './dto/projects.dto';
import { PrismaService } from 'src/prisma.service';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async projectsList() {
    const projects = await this.prisma.project.findMany();

    return {
      projects,
    };
  }

  async projectById(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project)
      throw new NotFoundException(`Project with id: ${projectId} not found`);

    return {
      project,
    };
  }

  async addProject(dto: ProjectsDto) {
    const project = await this.prisma.project.create({
      data: {
        id: uuidv4(),
        ...dto,
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
