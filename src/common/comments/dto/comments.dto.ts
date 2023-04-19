import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CommentsDto {
  @MinLength(5, { message: 'Author name must be at least 5 characters long' })
  @IsString({ message: 'Author name must be a string' })
  author: string;

  @MinLength(20, { message: 'Comment must be at least 20 characters long' })
  @MaxLength(250, {
    message: 'Comment cannot be longer than 250 characters',
  })
  @IsString({ message: 'Comment must be a string' })
  comment: string;

  @IsUUID('4', { message: 'postId must be in format UUID4' })
  postId: string;
}
