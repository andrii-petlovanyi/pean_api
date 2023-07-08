-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "inDraft" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "inDraft" BOOLEAN NOT NULL DEFAULT true;
