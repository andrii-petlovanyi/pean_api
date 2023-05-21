import { ArrayNotEmpty, IsArray, IsString, MinLength } from 'class-validator';

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
  @MinLength(5, { message: 'Folder name must be at least 5 characters long' })
  @IsString({ message: 'Folder name must be a string' })
  folderName: string;
}
