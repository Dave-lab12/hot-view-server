-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN', 'JOURNALIST');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "secondName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phonenumber" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'BASIC',
    "password" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
