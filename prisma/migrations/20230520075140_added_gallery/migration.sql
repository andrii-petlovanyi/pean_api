/*
  Warnings:

  - You are about to drop the column `images` on the `Post` table. All the data in the column will be lost.
  - The `meta_keywords` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "meta_keywords",
ADD COLUMN     "meta_keywords" TEXT[];

-- CreateTable
CREATE TABLE "GalleryFolder" (
    "id" TEXT NOT NULL,
    "folderName" TEXT NOT NULL,

    CONSTRAINT "GalleryFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubFolder" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "subFolderId" TEXT NOT NULL,

    CONSTRAINT "SubFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "subFolderId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubFolder" ADD CONSTRAINT "SubFolder_subFolderId_fkey" FOREIGN KEY ("subFolderId") REFERENCES "GalleryFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_subFolderId_fkey" FOREIGN KEY ("subFolderId") REFERENCES "SubFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
