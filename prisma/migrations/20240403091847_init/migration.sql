-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "kitchen" TEXT,
ALTER COLUMN "bath" SET DATA TYPE TEXT,
ALTER COLUMN "shortDescription" DROP NOT NULL;
