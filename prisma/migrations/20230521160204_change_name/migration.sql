/*
  Warnings:

  - You are about to drop the column `subFolderId` on the `SubFolder` table. All the data in the column will be lost.
  - Added the required column `galleryFolderId` to the `SubFolder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubFolder" DROP CONSTRAINT "SubFolder_subFolderId_fkey";

-- AlterTable
ALTER TABLE "SubFolder" DROP COLUMN "subFolderId",
ADD COLUMN     "galleryFolderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SubFolder" ADD CONSTRAINT "SubFolder_galleryFolderId_fkey" FOREIGN KEY ("galleryFolderId") REFERENCES "GalleryFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
