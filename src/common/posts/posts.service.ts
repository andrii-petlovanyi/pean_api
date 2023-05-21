import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PostsDto, UpdatePostDto } from '@src/common/posts/dto/posts.dto';
import { PrismaService } from '@src/prisma.service';
import { CloudinaryService } from '@src/common/cloudinary/cloudinary.service';
import { ImageEditorService } from '@src/common/image-editor/image-editor.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
    private imageService: ImageEditorService,
  ) {}

  async postsList() {
    const posts = await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        images: true,
      },
    });

    return posts;
  }

  async postsSitemapRoute() {
    return await this.prisma.post.findMany({
      select: {
        id: true,
      },
    });
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

  async addPost(dto: PostsDto) {
    const post = await this.prisma.post.create({
      data: {
        id: uuidv4(),
        ...dto,
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

  async updatePost(postId: string, dto: UpdatePostDto) {
    const updatedPost = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: dto,
    });

    if (!updatedPost) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    return {
      message: 'Post updated successfully',
      post: updatedPost,
    };
  }
}
