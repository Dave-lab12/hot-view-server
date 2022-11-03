/*
  Warnings:

  - You are about to drop the column `Category_id` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `Content` on the `News` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "Category_id",
DROP COLUMN "Content",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL;
