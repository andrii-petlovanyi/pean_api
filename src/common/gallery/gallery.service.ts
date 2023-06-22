import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '@src/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ImageEditorService } from '../image-editor/image-editor.service';
import {
  Album,
  GalleryFolder,
  UpdateAlbum,
  UpdateGalleryFolder,
} from './dto/gallery.dto';
import { constants } from '@src/config/cloudinary.config';

@Injectable()
export class GalleryService {
  constructor(
    private readonly prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
    private imageService: ImageEditorService,
  ) {}

  async galleryFolders() {
    const folders = await this.prismaService.galleryFolder.findMany({
      select: {
        id: true,
        folderName: true,
        imgPlaceholder: true,
        imgPlaceholderId: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return { folders };
  }

  async oneGalleryFolder(galleryFolderId: string) {
    const folder = await this.prismaService.galleryFolder.findUnique({
      where: {
        id: galleryFolderId,
      },
      select: {
        id: true,
        folderName: true,
        albums: {
          select: {
            id: true,
            albumName: true,
            images: true,
          },
          orderBy: {
            updatedAt: 'desc',
          },
        },
      },
    });

    if (!folder)
      throw new NotFoundException(
        `Gallery folder with id: ${galleryFolderId} not found`,
      );

    return { folder };
  }

  async createGalleryFolder(file: Express.Multer.File, dto: GalleryFolder) {
    const optimizedImage = await this.imageService.cropAndConvertToWebp(
      file,
      400,
    );
    const imageData = await this.cloudinaryService.uploadOneImage(
      optimizedImage,
      constants.FOLDERS_PLACEHOLDERS,
    );

    const folder = await this.prismaService.galleryFolder.create({
      data: {
        ...dto,
        imgPlaceholder: imageData.url,
        imgPlaceholderId: imageData.publicId,
      },
    });

    if (!folder) {
      await this.cloudinaryService.deleteOneImage(imageData.publicId);

      throw new ConflictException(
        `Gallery folder with this name: ${dto.folderName} is exists`,
      );
    }

    return {
      message: `Gallery folder ${dto.folderName} created successfully`,
    };
  }

  async deleteGalleryFolder(galleryFolderId: string) {
    const folder = await this.prismaService.galleryFolder.delete({
      where: {
        id: galleryFolderId,
      },
    });

    if (!folder)
      throw new NotFoundException(
        `Gallery folder with id: ${galleryFolderId} not found`,
      );

    await this.cloudinaryService.deleteOneImage(folder.imgPlaceholderId);

    return {
      message: `Gallery folder with id: ${galleryFolderId} has been deleted`,
    };
  }

  async updateGalleryFolder(
    galleryFolderId: string,
    file: Express.Multer.File,
    dto: UpdateGalleryFolder,
  ) {
    const folder = await this.prismaService.galleryFolder.findUnique({
      where: {
        id: galleryFolderId,
      },
    });

    if (!folder)
      throw new NotFoundException(
        `Gallery folder with id: ${galleryFolderId} not found`,
      );

    const optimizedImage = file
      ? await this.imageService.cropAndConvertToWebp(file, 400)
      : undefined;

    const updatedImgData = file
      ? await this.cloudinaryService.updateOneImage(
          optimizedImage,
          folder.imgPlaceholder,
          constants.FOLDERS_PLACEHOLDERS,
        )
      : undefined;

    await this.prismaService.galleryFolder.update({
      where: {
        id: galleryFolderId,
      },
      data: {
        ...dto,
        imgPlaceholder: updatedImgData?.url || folder.imgPlaceholder,
        imgPlaceholderId: updatedImgData?.publicId || folder.imgPlaceholderId,
      },
    });

    return {
      message: `Gallery folder with id: ${galleryFolderId} has been updated`,
    };
  }

  async oneAlbum(albumId: string) {
    const album = await this.prismaService.album.findUnique({
      where: {
        id: albumId,
      },
      select: {
        id: true,
        albumName: true,
        images: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    if (!album)
      throw new NotFoundException(`Album  with id: ${albumId} not found`);

    return { album };
  }

  async searchAlbum(search: string) {
    const albums = await this.prismaService.album.findMany({
      where: {
        albumName: { contains: search, mode: 'insensitive' },
      },
      select: {
        id: true,
        images: true,
        albumName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { albums };
  }

  async addImgInAlbum(
    files: Express.Multer.File[],
    dto: Album,
    galleryFolderId: string,
  ) {
    const optimizedImages = await Promise.all(
      files.map((file) => this.imageService.cropAndConvertToWebp(file)),
    );

    const imagesUrls = await this.cloudinaryService.uploadManyImages(
      optimizedImages,
      dto.albumName,
    );

    const album = await this.prismaService.album.create({
      data: {
        id: uuidv4(),
        ...dto,
        galleryFolderId,
      },
      select: {
        id: true,
        albumName: true,
        images: true,
      },
    });

    const imageCreations = imagesUrls.map((imgData) =>
      this.prismaService.image.create({
        data: {
          url: imgData.url,
          publicId: imgData.publicId,
          albumId: album.id,
        },
      }),
    );

    await this.prismaService.$transaction(imageCreations);

    return {
      message: `Album ${dto.albumName} created successfully`,
    };
  }

  async updateAlbum(
    albumId: string,
    dto: UpdateAlbum,
    files: Express.Multer.File[],
  ) {
    const { albumName, images } = dto;

    if (images && images.length > 0) {
      await Promise.all(images.map((imageId) => this.deleteImage(imageId)));
    }

    if (files && files.length > 0) {
      const optimizedImages = await Promise.all(
        files.map((file) => this.imageService.cropAndConvertToWebp(file)),
      );

      const imagesUrls = await this.cloudinaryService.uploadManyImages(
        optimizedImages,
        albumName,
      );

      const imageCreations = imagesUrls.map((imgData) =>
        this.prismaService.image.create({
          data: {
            url: imgData.url,
            publicId: imgData.publicId,
            albumId: albumId,
          },
        }),
      );

      await this.prismaService.$transaction(imageCreations);
    }

    if (albumName) {
      await this.prismaService.album.update({
        where: {
          id: albumId,
        },
        data: {
          albumName,
        },
        select: {
          id: true,
          albumName: true,
          images: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      });
    }

    return {
      message: `Album with id: ${albumId} updated successfully`,
    };
  }

  async deleteAlbum(albumId: string) {
    const album = await this.prismaService.album.findUnique({
      where: {
        id: albumId,
      },
      include: {
        images: true,
      },
    });

    if (!album) {
      throw new NotFoundException(`Album with id: ${albumId} not found`);
    }

    const imageIds = album.images.map((image) => image.id);

    await Promise.all(imageIds.map((imageId) => this.deleteImage(imageId)));

    await this.prismaService.album.delete({
      where: {
        id: albumId,
      },
    });

    return {
      message: `Album with id: ${albumId} has been deleted`,
    };
  }

  private async deleteImage(imageId: string) {
    const image = await this.prismaService.image.delete({
      where: {
        id: imageId,
      },
    });

    if (!image)
      throw new NotFoundException(`Image with id: ${imageId} not found`);

    await this.cloudinaryService.deleteOneImage(image.publicId);

    return;
  }
}
