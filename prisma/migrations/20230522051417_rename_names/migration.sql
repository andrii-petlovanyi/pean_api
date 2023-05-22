/*
  Warnings:

  - You are about to drop the column `subFolderId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `subFolderId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[albumId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[albumId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_subFolderId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_subFolderId_fkey";

-- DropIndex
DROP INDEX "Post_subFolderId_key";

-- DropIndex
DROP INDEX "Project_subFolderId_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "subFolderId",
ADD COLUMN     "albumId" TEXT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "subFolderId",
ADD COLUMN     "albumId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_albumId_key" ON "Post"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_albumId_key" ON "Project"("albumId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
