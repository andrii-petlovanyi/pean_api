import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ProjectsModule } from './projects/projects.module';
import { MetaModule } from './meta/meta.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PostsModule,
    ProjectsModule,
    MetaModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}
