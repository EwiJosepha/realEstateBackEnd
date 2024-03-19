-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "hashpassword" DROP NOT NULL,
ALTER COLUMN "hashpassword" SET DEFAULT 'default_password';
