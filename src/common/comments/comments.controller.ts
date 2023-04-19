import { Controller } from '@nestjs/common';

import { CommentsService } from '@src/common/comments/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
}
