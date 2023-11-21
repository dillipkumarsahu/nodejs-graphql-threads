/*
  Warnings:

  - You are about to drop the column `description` on the `threads` table. All the data in the column will be lost.
  - Added the required column `thread` to the `threads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "threads" DROP COLUMN "description",
ADD COLUMN     "thread" TEXT NOT NULL;
