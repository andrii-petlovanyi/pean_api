/*
  Warnings:

  - You are about to drop the column `projet_date` on the `Project` table. All the data in the column will be lost.
  - Added the required column `project_date` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projet_date",
ADD COLUMN     "project_date" TIMESTAMP(3) NOT NULL;
