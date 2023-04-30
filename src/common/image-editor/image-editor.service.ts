import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class ImageEditorService {
  async cropImage(
    inputImage: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    return await sharp(inputImage)
      .resize({ width, height, fit: 'cover', position: 'centre' })
      .toBuffer();
  }

  async cropAndConvertToWebp(
    inputImage: Buffer,
    width?: number,
    quality?: number,
  ): Promise<Buffer> {
    const widthImage = width ? width : 1280;
    const heightImage = Math.round((widthImage / 3) * 2);
    const qualityImage = quality ? quality : 80;

    return await sharp(inputImage)
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
  }

  async convertToWebp(inputImage: Buffer, quality?: number) {
    const qualityImage = quality ? quality : 80;

    return sharp(inputImage)
      .webp({ quality: qualityImage, alphaQuality: 100 })
      .toBuffer();
  }
}
