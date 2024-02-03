/*
  Warnings:

  - You are about to drop the column `count` on the `song_user_plays` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "song_user_plays" DROP COLUMN "count",
ADD COLUMN     "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
