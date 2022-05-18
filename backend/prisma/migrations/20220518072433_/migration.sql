/*
  Warnings:

  - The `recurrence` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Recurrence" AS ENUM ('NONE', 'MONTHLY', 'WEEKLY', 'YEARLY');

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" DROP DEFAULT,
DROP COLUMN "recurrence",
ADD COLUMN     "recurrence" "Recurrence" NOT NULL DEFAULT E'NONE';

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
