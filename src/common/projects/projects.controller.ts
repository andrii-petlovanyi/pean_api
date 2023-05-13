import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Auth } from '@src/common/users/decorator/auth.decorator';
import { ProjectsService } from '@src/common/projects/projects.service';
import {
  ProjectsDto,
  UpdateProjectsDto,
} from '@src/common/projects/dto/projects.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('/')
  async projectsList() {
    return this.projectsService.projectsList();
  }

  @Get('/sitemap')
  async projectsSitemapRoute() {
    return this.projectsService.projectsSitemapRoute();
  }

  @Get('/:projectId')
  async projectById(@Param('projectId') projectId: string) {
    return this.projectsService.projectById(projectId);
  }

  @Auth()
  @Post('/')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('images'))
  async addProject(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: ProjectsDto,
  ) {
    return this.projectsService.addProject(files, dto);
  }

  @Auth()
  @Delete('/:projectId')
  async deleteProject(@Param('projectId') projectId: string) {
    return this.projectsService.deleteProject(projectId);
  }

  @Auth()
  @Patch('/:projectId')
  @UsePipes(new ValidationPipe())
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() dto: UpdateProjectsDto,
  ) {
    return this.projectsService.updateProject(projectId, dto);
  }
}