import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Auth } from '@src/common/users/guard/auth.guard';
import { ProjectsService } from '@src/common/projects/projects.service';
import {
  ProjectsDto,
  UpdateProjectsDto,
} from '@src/common/projects/dto/projects.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('/')
  async projectsList() {
    return this.projectsService.projectsList();
  }

  @Auth()
  @Get('/dashboard')
  async dashboardProjectsList(@Query('inDraft') inDraft: boolean) {
    return this.projectsService.dashboardProjectsList(inDraft);
  }

  @Get('/sitemap')
  async projectsSitemapRoute() {
    return this.projectsService.projectsSitemapRoutes();
  }

  @Get('/:slug')
  async projectById(@Param('slug') slug: string) {
    return this.projectsService.projectBySlug(slug);
  }

  @Auth()
  @Post('/')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('image'))
  async addProject(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: ProjectsDto,
  ) {
    return this.projectsService.addProject(file, dto);
  }

  @Auth()
  @Delete('/:projectId')
  async deleteProject(@Param('projectId') projectId: string) {
    return this.projectsService.deleteProject(projectId);
  }

  @Auth()
  @Patch('/:projectId')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('image'))
  async updateProject(
    @UploadedFile() file: Express.Multer.File,
    @Param('projectId') projectId: string,
    @Body() dto: UpdateProjectsDto,
  ) {
    return this.projectsService.updateProject(projectId, file, dto);
  }
}
