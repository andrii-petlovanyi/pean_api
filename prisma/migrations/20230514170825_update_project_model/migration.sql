/*
  Warnings:

  - You are about to drop the column `projetDate` on the `Project` table. All the data in the column will be lost.
  - Added the required column `projet_date` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projetDate",
ADD COLUMN     "projet_date" TIMESTAMP(3) NOT NULL;