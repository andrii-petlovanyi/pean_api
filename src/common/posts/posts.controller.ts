import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Auth } from '@src/common/users/guard/auth.guard';
import { PostsService } from '@src/common/posts/posts.service';
import { PostsDto, UpdatePostDto } from '@src/common/posts/dto/posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  async projectsList() {
    return this.postsService.postsList();
  }

  @Auth()
  @Get('/dashboard')
  async dashboardPostsList(@Query('inDraft') inDraft: boolean) {
    return this.postsService.dashboardPostsList(inDraft);
  }

  @Get('/sitemap')
  async postsSitemapRoute() {
    return this.postsService.postsSitemapRoute();
  }

  @Get('/:slug')
  async projectById(@Param('slug') slug: string) {
    return this.postsService.postBySlug(slug);
  }

  @Auth()
  @Post('/')
  @UsePipes(new ValidationPipe())
  async addProject(@Body() dto: PostsDto) {
    return this.postsService.addPost(dto);
  }

  @Auth()
  @Delete('/:postId')
  async deleteProject(@Param('postId') postId: string) {
    return this.postsService.deletePost(postId);
  }

  @Auth()
  @Patch('/:postId')
  @UsePipes(new ValidationPipe())
  async updateProject(
    @Param('postId') postId: string,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(postId, dto);
  }
}
