/*
  Warnings:

  - A unique constraint covering the columns `[subFolderId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subFolderId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subFolderId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subFolderId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "subFolderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "subFolderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_subFolderId_key" ON "Post"("subFolderId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_subFolderId_key" ON "Project"("subFolderId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_subFolderId_fkey" FOREIGN KEY ("subFolderId") REFERENCES "SubFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subFolderId_fkey" FOREIGN KEY ("subFolderId") REFERENCES "SubFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
