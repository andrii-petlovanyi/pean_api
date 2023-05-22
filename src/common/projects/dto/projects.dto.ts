import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ArrayMinSize,
  IsUrl,
} from 'class-validator';

export class ProjectsDto {
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @MinLength(2, { message: 'Platform must be at least 2 characters long' })
  @MaxLength(200, {
    message: 'Platform name cannot be longer than 200 characters',
  })
  @IsString({ message: 'Platform must be a string' })
  platform: string;

  @ArrayMinSize(1, { message: 'At least one technology is required' })
  @IsString({ each: true, message: 'All technologies must be strings' })
  technology: string[];

  @IsUrl()
  @IsString({ message: 'URL on demo project must be a string' })
  url_demo?: string;

  @IsUrl()
  @IsString({ message: 'URL on project repository must be a string' })
  url_repository?: string;

  @IsString({ message: 'Project date must be a string' })
  project_date: string;

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

  @IsOptional()
  @IsString({ message: 'albumId must be a string' })
  albumId?: string;
}

export class UpdateProjectsDto {}
