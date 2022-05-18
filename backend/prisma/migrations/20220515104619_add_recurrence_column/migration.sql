/*
  Warnings:

  - You are about to drop the column `monthly` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `weekly` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `yearly` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "monthly",
DROP COLUMN "weekly",
DROP COLUMN "yearly",
ADD COLUMN     "recurrence" VARCHAR(255) NOT NULL DEFAULT E'';
