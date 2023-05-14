/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Project` table. All the data in the column will be lost.
  - Added the required column `img_placeholder` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projetDate` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_demo` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_repository` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "images",
ADD COLUMN     "img_placeholder" TEXT NOT NULL,
ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "projetDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "url_demo" TEXT NOT NULL,
ADD COLUMN     "url_repository" TEXT NOT NULL;
