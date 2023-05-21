import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { PrismaService } from '@src/prisma.service';
import { ImageEditorService } from '../image-editor/image-editor.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  controllers: [GalleryController],
  providers: [
    GalleryService,
    PrismaService,
    ImageEditorService,
    CloudinaryService,
  ],
})
export class GalleryModule {}
