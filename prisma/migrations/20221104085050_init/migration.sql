/*
  Warnings:

  - A unique constraint covering the columns `[category_name]` on the table `Categroy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Categroy_category_name_key" ON "Categroy"("category_name");
