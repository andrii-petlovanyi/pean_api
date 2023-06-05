import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class MetaDto {
  @IsString({ message: 'Page must be a string' })
  page: string;

  @IsString({ message: 'Meta title must be a string' })
  @IsOptional({ message: 'Meta title is optional' })
  metaTitle?: string;

  @IsString({ message: 'Meta description must be a string' })
  @IsOptional({ message: 'Meta description is optional' })
  @MinLength(30, {
    message: 'Meta description must be at las 30 characters',
  })
  @MaxLength(250, {
    message: 'Meta description must be at most 250 characters',
  })
  metaDescription?: string;

  @IsString({ message: 'Meta keywords must be a string' })
  @IsOptional({ message: 'Meta keywords is optional' })
  metaKeywords?: string;

  @IsString({ message: 'Meta image must be a string' })
  @IsOptional({ message: 'Meta image is optional' })
  metaImage?: string;

  @IsString({ message: 'Meta author must be a string' })
  @IsOptional({ message: 'Meta author is optional' })
  metaAuthor?: string;
}
