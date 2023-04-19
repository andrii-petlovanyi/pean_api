import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@src/common/users/users.module';
import { PostsModule } from '@src/common/posts/posts.module';
import { ProjectsModule } from '@src/common/projects/projects.module';
import { MetaModule } from '@src/common/meta/meta.module';
import { CommentsModule } from '@src/common/comments/comments.module';
import { CloudinaryModule } from '@src/common/cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PostsModule,
    ProjectsModule,
    MetaModule,
    CommentsModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
