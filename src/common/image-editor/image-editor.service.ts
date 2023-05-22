import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class ImageEditorService {
  async cropImage(
    inputImage: Express.Multer.File,
    width: number,
    height: number,
  ): Promise<Express.Multer.File> {
    const croppedBuffer = await sharp(inputImage.buffer)
      .resize({ width, height, fit: 'cover', position: 'centre' })
      .toBuffer();

    const croppedImage = { ...inputImage, buffer: croppedBuffer };

    return croppedImage;
  }

  async cropAndConvertToWebp(
    file: Express.Multer.File,
    width?: number,
    quality?: number,
  ): Promise<Express.Multer.File> {
    const widthImage = width || 1280;
    const heightImage = Math.round((widthImage / 3) * 2);
    const qualityImage = quality || 80;

    const optimizedImageBuffer = await sharp(file.buffer)
      .webp({ quality: qualityImage, alphaQuality: 100 })
      .resize({
        width: widthImage,
        height: heightImage,
        fit: 'cover',
        position: 'centre',
        fastShrinkOnLoad: true,
        withoutEnlargement: true,
      })
      .toBuffer();

    const updatedFile = { ...file, buffer: optimizedImageBuffer };

    return updatedFile;
  }

  async convertToWebp(inputImage: Express.Multer.File, quality?: number) {
    const qualityImage = quality ? quality : 80;

    const convertedBuffer = sharp(inputImage.buffer)
      .webp({ quality: qualityImage, alphaQuality: 100 })
      .toBuffer();

    const convertedImage = { ...inputImage, buffer: convertedBuffer };

    return convertedImage;
  }
}
