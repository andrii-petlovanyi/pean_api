-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "meta_title" DROP NOT NULL,
ALTER COLUMN "meta_description" DROP NOT NULL,
ALTER COLUMN "meta_keywords" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "meta_title" DROP NOT NULL,
ALTER COLUMN "meta_description" DROP NOT NULL,
ALTER COLUMN "meta_keywords" DROP NOT NULL;
