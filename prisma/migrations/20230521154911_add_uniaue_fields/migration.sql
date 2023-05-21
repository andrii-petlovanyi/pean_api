/*
  Warnings:

  - You are about to drop the column `projectName` on the `SubFolder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[folderName]` on the table `GalleryFolder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[albumName]` on the table `SubFolder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `albumName` to the `SubFolder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubFolder" DROP COLUMN "projectName",
ADD COLUMN     "albumName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GalleryFolder_folderName_key" ON "GalleryFolder"("folderName");

-- CreateIndex
CREATE UNIQUE INDEX "SubFolder_albumName_key" ON "SubFolder"("albumName");
