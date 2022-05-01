/*
  Warnings:

  - Added the required column `isDone` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDone` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isDone" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "isDone" BOOLEAN NOT NULL;
