/*
  Warnings:

  - A unique constraint covering the columns `[firstName,secondName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_firstName_secondName_key" ON "User"("firstName", "secondName");
