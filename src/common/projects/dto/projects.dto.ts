import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsUrl,
} from 'class-validator';

export class ProjectsDto {
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsOptional()
  inDraft: string;

  @MinLength(2, { message: 'Platform must be at least 2 characters long' })
  @MaxLength(200, {
    message: 'Platform name cannot be longer than 200 characters',
  })
  @IsString({ message: 'Platform must be a string' })
  platform: string;

  @IsString({ message: 'All technologies must be strings' })
  technology: string;

  @IsUrl()
  @IsString({ message: 'URL on demo project must be a string' })
  urlDemo?: string;

  @IsUrl()
  @IsString({ message: 'URL on project repository must be a string' })
  urlRepository?: string;

  @IsString({ message: 'Project date must be a string' })
  projectDate: string;

  @MinLength(100, { message: 'Article must be at least 100 characters long' })
  @IsString({ message: 'Article must be a string' })
  article: string;

  @IsString({ message: 'Meta title must be a string' })
  @IsOptional()
  metaTitle?: string;

  @IsString({ message: 'Meta description must be a string' })
  @IsOptional()
  metaDescription?: string;

  @IsString({ message: 'Meta keywords must be a string' })
  @IsOptional()
  metaKeywords?: string;

  @IsOptional()
  @IsString({ message: 'albumId must be a string' })
  albumId?: string;
}

export class UpdateProjectsDto {
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title: string;

  @IsOptional()
  inDraft: string;

  @MinLength(2, { message: 'Platform must be at least 2 characters long' })
  @MaxLength(200, {
    message: 'Platform name cannot be longer than 200 characters',
  })
  @IsString({ message: 'Platform must be a string' })
  @IsOptional()
  platform: string;

  @IsString({ message: 'All technologies must be strings' })
  @IsOptional()
  technology: string;

  @IsUrl()
  @IsString({ message: 'URL on demo project must be a string' })
  @IsOptional()
  urlDemo?: string;

  @IsUrl()
  @IsString({ message: 'URL on project repository must be a string' })
  @IsOptional()
  urlRepository?: string;

  @IsString({ message: 'Project date must be a string' })
  @IsOptional()
  projectDate: string;

  @MinLength(100, { message: 'Article must be at least 100 characters long' })
  @IsString({ message: 'Article must be a string' })
  @IsOptional()
  article: string;

  @IsString({ message: 'Meta title must be a string' })
  @IsOptional()
  metaTitle?: string;

  @IsString({ message: 'Meta description must be a string' })
  @IsOptional()
  metaDescription?: string;

  @IsString({ message: 'Meta keywords must be a string' })
  @IsOptional()
  metaKeywords?: string;

  @IsOptional()
  @IsString({ message: 'albumId must be a string' })
  albumId?: string;
}
