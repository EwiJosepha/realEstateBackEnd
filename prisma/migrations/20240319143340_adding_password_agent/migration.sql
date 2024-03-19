/*
  Warnings:

  - You are about to drop the column `name` on the `Agent` table. All the data in the column will be lost.
  - Added the required column `hashpassword` to the `Agent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agent" DROP COLUMN "name",
ADD COLUMN     "hashpassword" TEXT NOT NULL;
