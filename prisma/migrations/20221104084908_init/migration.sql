/*
  Warnings:

  - You are about to drop the column `category_id` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "category_id";

-- CreateTable
CREATE TABLE "Categroy" (
    "category_id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "Categroy_pkey" PRIMARY KEY ("category_id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_id_fkey" FOREIGN KEY ("id") REFERENCES "Categroy"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
