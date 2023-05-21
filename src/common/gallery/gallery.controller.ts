import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Album, GalleryFolder, UpdateAlbum } from './dto/gallery.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get('/')
  async galleryFolders() {
    return await this.galleryService.galleryFolders();
  }

  @Post('/')
  async createGalleryFolder(@Body() dto: GalleryFolder) {
    return await this.galleryService.createGalleryFolder(dto);
  }

  @Delete('/:galleryFolderId')
  async deleteGalleryFolder(@Param('galleryFolderId') galleryFolderId: string) {
    return await this.galleryService.deleteGalleryFolder(galleryFolderId);
  }

  @Patch('/:galleryFolderId')
  async updateGalleryFolder(
    @Param('galleryFolderId') galleryFolderId: string,
    @Body() dto: GalleryFolder,
  ) {
    return await this.galleryService.updateGalleryFolder(galleryFolderId, dto);
  }

  @Get('/:galleryFolderId')
  async oneGalleryFolder(@Param('galleryFolderId') galleryFolderId: string) {
    return await this.galleryService.oneGalleryFolder(galleryFolderId);
  }

  @Get('/album/:albumId')
  async oneAlbum(@Param('albumId') albumId: string) {
    return await this.galleryService.oneAlbum(albumId);
  }

  @Post('/:galleryFolderId/album/')
  @UseInterceptors(FilesInterceptor('images'))
  async createAlbum(
    @Param('galleryFolderId') galleryFolderId: string,
    @Body() dto: Album,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return await this.galleryService.addImgInAlbum(files, dto, galleryFolderId);
  }

  @Patch('/album/:albumId')
  @UseInterceptors(FilesInterceptor('images'))
  async updateAlbum(
    @Param('albumId') albumId: string,
    @Body() dto: UpdateAlbum,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return await this.galleryService.updateAlbum(albumId, dto, files);
  }

  @Delete('/album/:albumId')
  async deleteAlbum(@Param('albumId') albumId: string) {
    return await this.galleryService.deleteAlbum(albumId);
  }
}
