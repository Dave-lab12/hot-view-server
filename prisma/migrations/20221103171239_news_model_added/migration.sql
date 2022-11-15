/*
  Warnings:

  - You are about to drop the column `secondName` on the `User` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordConfirm` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- DELETE FROM "User";

ALTER TABLE "User" DROP COLUMN "secondName",
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "passwordConfirm" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "Category_id" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "view" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
