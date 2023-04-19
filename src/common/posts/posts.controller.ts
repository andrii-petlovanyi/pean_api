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
import { PostsService } from '@src/common/posts/posts.service';
import { PostsDto, UpdatePostDto } from '@src/common/posts/dto/posts.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  async projectsList() {
    return this.postsService.postsList();
  }

  @Get('/:postId')
  async projectById(@Param('postId') postId: string) {
    return this.postsService.postById(postId);
  }

  @Auth()
  @Post('/')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('images'))
  async addProject(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: PostsDto,
  ) {
    return this.postsService.addPost(files, dto);
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
