import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class Album {
  @MinLength(5, { message: 'Album name must be at least 5 characters long' })
  @IsString({ message: 'Album name must be a string' })
  albumName: string;
}

export class UpdateAlbum {
  @MinLength(5, { message: 'Album name must be at least 5 characters long' })
  @IsString({ message: 'Album name must be a string' })
  albumName?: string;

  @IsArray({ message: 'Images must be an array' })
  @ArrayNotEmpty({ message: 'Images array must not be empty' })
  images?: string[];
}

export class GalleryFolder {
  @MinLength(2, { message: 'Folder name must be at least 5 characters long' })
  @IsString({ message: 'Folder name must be a string' })
  folderName: string;
}

export class UpdateGalleryFolder {
  @MinLength(2, { message: 'Folder name must be at least 5 characters long' })
  @IsString({ message: 'Folder name must be a string' })
  @IsOptional()
  folderName?: string;

  @IsOptional()
  @IsString({ message: 'Folder name must be a string' })
  imgPlaceholder?: string;
}
