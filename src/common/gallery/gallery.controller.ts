import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Album, GalleryFolder, UpdateAlbum } from './dto/gallery.dto';
import { Auth } from '../users/guard/auth.guard';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(300000)
  @Get('/')
  async galleryFolders() {
    return await this.galleryService.galleryFolders();
  }

  @Auth()
  @Post('/')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('imgPlaceholder'))
  async createGalleryFolder(
    @UploadedFile() imgPlaceholder: Express.Multer.File,
    @Body() dto: GalleryFolder,
  ) {
    return await this.galleryService.createGalleryFolder(imgPlaceholder, dto);
  }

  @Auth()
  @Delete('/:galleryFolderId')
  async deleteGalleryFolder(@Param('galleryFolderId') galleryFolderId: string) {
    return await this.galleryService.deleteGalleryFolder(galleryFolderId);
  }

  @Auth()
  @Patch('/:galleryFolderId')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('imgPlaceholder'))
  async updateGalleryFolder(
    @Param('galleryFolderId') galleryFolderId: string,
    @UploadedFile() imgPlaceholder: Express.Multer.File,
    @Body() dto: GalleryFolder,
  ) {
    return await this.galleryService.updateGalleryFolder(
      galleryFolderId,
      imgPlaceholder,
      dto,
    );
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(300000)
  @Get('/:galleryFolderId')
  async oneGalleryFolder(@Param('galleryFolderId') galleryFolderId: string) {
    return await this.galleryService.oneGalleryFolder(galleryFolderId);
  }

  @Auth()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(600000)
  @Get('/album/search')
  async searchAlbum(@Query('albumName') albumName: string) {
    return await this.galleryService.searchAlbum(albumName);
  }

  @Get('/album/:albumId')
  async oneAlbum(@Param('albumId') albumId: string) {
    return await this.galleryService.oneAlbum(albumId);
  }

  @Auth()
  @Post('/:galleryFolderId/album/')
  @UseInterceptors(FilesInterceptor('images'))
  async createAlbum(
    @Param('galleryFolderId') galleryFolderId: string,
    @Body() dto: Album,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.galleryService.addImgInAlbum(
      images,
      dto,
      galleryFolderId,
    );
  }

  @Auth()
  @Patch('/album/:albumId')
  @UseInterceptors(FilesInterceptor('images'))
  async updateAlbum(
    @Param('albumId') albumId: string,
    @Body() dto: UpdateAlbum,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return await this.galleryService.updateAlbum(albumId, dto, images);
  }

  @Auth()
  @Delete('/album/:albumId')
  async deleteAlbum(@Param('albumId') albumId: string) {
    return await this.galleryService.deleteAlbum(albumId);
  }
}
