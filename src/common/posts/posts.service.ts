import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PostsDto, UpdatePostDto } from '@src/common/posts/dto/posts.dto';
import { PrismaService } from '@src/prisma.service';
import slugify from 'slugify';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async postsList() {
    const posts = await this.prisma.post.findMany({
      where: { inDraft: false },
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        createdAt: true,
        album: {
          select: {
            images: true,
          },
        },
      },
    });

    return { posts };
  }

  async dashboardPostsList(inDraft?: boolean) {
    const selectOptions = {
      id: true,
      title: true,
      description: true,
      slug: true,
      inDraft: true,
      createdAt: true,
      album: {
        select: {
          images: true,
        },
      },
    };

    const orderByOptions = {
      updatedAt: 'desc',
    };

    const searchOptions: any = {
      select: selectOptions,
      orderBy: orderByOptions,
    };

    if (typeof inDraft !== 'undefined') {
      searchOptions.where = {
        inDraft: inDraft,
      };
    }

    const posts = await this.prisma.post.findMany(searchOptions);

    return { posts };
  }

  async postsSitemapRoute() {
    return await this.prisma.post.findMany({
      select: {
        id: true,
        slug: true,
      },
    });
  }

  async postBySlug(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        slug,
      },
      include: {
        album: {
          include: {
            images: true,
          },
        },
      },
    });

    if (!post) throw new NotFoundException(`Post with slug: ${slug} not found`);

    return { post };
  }

  async addPost(dto: PostsDto) {
    const slug = slugify(dto.title, { lower: true, strict: true });
    const post = await this.prisma.post.create({
      data: {
        id: uuidv4(),
        ...dto,
        slug,
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
    const data: any = { ...dto };

    if (dto.title) {
      const slug = slugify(dto.title, { lower: true, strict: true });
      data.slug = slug;
    }

    const updatedPost = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data,
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
