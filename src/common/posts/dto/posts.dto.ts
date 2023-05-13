import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PostsDto {
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @MinLength(20, { message: 'Description must be at least 20 characters long' })
  @MaxLength(370, {
    message: 'Description cannot be longer than 370 characters',
  })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @MinLength(100, { message: 'Article must be at least 100 characters long' })
  @IsString({ message: 'Article must be a string' })
  article: string;

  @IsString({ message: 'Meta title must be a string' })
  @IsOptional()
  @IsNotEmpty({ message: 'Meta title cannot be empty' })
  meta_title?: string;

  @IsString({ message: 'Meta description must be a string' })
  @IsOptional()
  @IsNotEmpty({ message: 'Meta description cannot be empty' })
  meta_description?: string;

  @IsString({ message: 'Meta keywords must be a string' })
  @IsOptional()
  @IsNotEmpty({ message: 'Meta keywords cannot be empty' })
  meta_keywords?: string;
}

export class UpdatePostDto {}
