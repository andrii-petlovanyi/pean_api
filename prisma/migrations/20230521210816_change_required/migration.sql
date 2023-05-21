-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_subFolderId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_subFolderId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "subFolderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "subFolderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_subFolderId_fkey" FOREIGN KEY ("subFolderId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subFolderId_fkey" FOREIGN KEY ("subFolderId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
