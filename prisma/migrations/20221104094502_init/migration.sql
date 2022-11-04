/*
  Warnings:

  - Added the required column `category_id` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `news_id` to the `Categroy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_id_fkey";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "category_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Categroy" ADD COLUMN     "news_id" TEXT NOT NULL;
