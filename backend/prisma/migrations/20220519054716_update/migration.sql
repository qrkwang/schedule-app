/*
  Warnings:

  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "userId" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "userId" VARCHAR(255) NOT NULL;
