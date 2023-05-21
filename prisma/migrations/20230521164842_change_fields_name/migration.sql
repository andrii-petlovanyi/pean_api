/*
  Warnings:

  - You are about to drop the column `subFolderId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the `SubFolder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `albumId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_subFolderId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_subFolderId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_subFolderId_fkey";

-- DropForeignKey
ALTER TABLE "SubFolder" DROP CONSTRAINT "SubFolder_galleryFolderId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "subFolderId",
ADD COLUMN     "albumId" TEXT NOT NULL;

-- DropTable
DROP TABLE "SubFolder";

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "albumName" TEXT NOT NULL,
    "galleryFolderId" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_albumName_key" ON "Album"("albumName");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_subFolderId_fkey" FOREIGN KEY ("subFolderId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subFolderId_fkey" FOREIGN KEY ("subFolderId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_galleryFolderId_fkey" FOREIGN KEY ("galleryFolderId") REFERENCES "GalleryFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
