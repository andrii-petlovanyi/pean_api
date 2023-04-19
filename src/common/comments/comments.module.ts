import { Module } from '@nestjs/common';

import { CommentsService } from '@src/common/comments/comments.service';
import { CommentsController } from '@src/common/comments/comments.controller';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
