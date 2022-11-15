/*
  Warnings:

  - Made the column `view` on table `Article` required. This step will fail if there are existing NULL values in that column.

*/
--Delete from table
-- DELETE FROM "Article";
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "view" SET NOT NULL,
ALTER COLUMN "view" SET DEFAULT 0;
