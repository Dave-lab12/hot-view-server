-- AlterTable
ALTER TABLE "News" ALTER COLUMN "image_id" DROP NOT NULL,
ALTER COLUMN "view" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
