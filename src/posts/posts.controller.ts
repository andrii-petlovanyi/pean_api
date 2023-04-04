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
import { Auth } from 'src/users/decorator/auth.decorator';
import { PostsService } from './posts.service';
import { PostsDto } from './dto/posts.dto';

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
  async updateProject(@Param('postId') postId: string, @Body() dto: PostsDto) {
    return this.postsService.updatePost(postId, dto);
  }
}
