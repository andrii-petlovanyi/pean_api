import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PostsDto } from '@src/common/posts/dto/posts.dto';
import { PrismaService } from '@src/prisma.service';
import { CloudinaryService } from '@src/common/cloudinary/cloudinary.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async postsList() {
    const posts = await this.prisma.post.findMany();

    return posts;
  }

  async postById(postId: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw new NotFoundException(`Post with id: ${postId} not found`);

    return post;
  }

  async addPost(files: Express.Multer.File[], dto: PostsDto) {
    const imagesUrl = await this.cloudinaryService.uploadImages(
      files,
      PostsService.name,
    );

    const post = await this.prisma.post.create({
      data: {
        id: uuidv4(),
        ...dto,
        images: [...imagesUrl],
      },
    });

    return {
      message: 'Post added successfully',
      post,
    };
  }

  async deletePost(postId: string) {
    const post = await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (!post) throw new NotFoundException(`Post with id: ${postId} not found`);

    return {
      message: `Post with id: ${postId} has been deleted`,
    };
  }

  async updatePost(postId: string, dto: PostsDto) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    const updatedPost = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: dto,
    });

    return {
      message: 'Post updated successfully',
      post: updatedPost,
    };
  }
}
