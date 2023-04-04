import { Auth } from './../users/decorator/auth.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsDto } from './dto/projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('/')
  async projectsList() {
    return this.projectsService.projectsList();
  }

  @Get('/:projectId')
  async projectById(@Param('projectId') projectId: string) {
    return this.projectsService.projectById(projectId);
  }

  @Auth()
  @Post('/')
  @UsePipes(new ValidationPipe())
  async addProject(@Body() dto: ProjectsDto) {
    return this.projectsService.addProject(dto);
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
    @Body() dto: ProjectsDto,
  ) {
    return this.projectsService.updateProject(projectId, dto);
  }
}
