import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  private async uploadImage(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: folderName },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadManyImages(files: Express.Multer.File[], folderName: string) {
    await this.createFolderIfNotExists(folderName);

    const uploadedImages = await Promise.all(
      files.map((file) =>
        this.uploadImage(file, folderName).catch(() => {
          throw new BadRequestException(
            `Invalid file type: ${file.originalname}`,
          );
        }),
      ),
    );

    return uploadedImages.map((img) => ({
      url: img.url,
      publicId: img.public_id,
    }));
  }

  async uploadOneImage(file: Express.Multer.File, folderName: string) {
    await this.createFolderIfNotExists(folderName);

    const uploadedImage = await this.uploadImage(file, folderName);
    return { url: uploadedImage.url, publicId: uploadedImage.public_id };
  }

  async updateOneImage(
    file: Express.Multer.File,
    imageUrl: string,
    folderName: string,
  ) {
    await this.deleteOneImage(imageUrl);

    return await this.uploadOneImage(file, folderName);
  }

  async deleteOneImage(publicId: string) {
    return await v2.uploader.destroy(publicId);
  }


  private async createFolderIfNotExists(folderName: string) {
    try {
      await v2.api.create_folder(folderName);
    } catch (error: any) {
      if (
        error.http_code !== 400 ||
        !error.message.includes('already exists')
      ) {
        throw error;
      }
    }
  }
}
