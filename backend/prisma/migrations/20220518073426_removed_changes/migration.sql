/*
  Warnings:

  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.
  - The `recurrence` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `userId` on the `Note` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "userId",
DROP COLUMN "recurrence",
ADD COLUMN     "recurrence" VARCHAR(255) NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "userId";

-- DropEnum
DROP TYPE "Recurrence";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
