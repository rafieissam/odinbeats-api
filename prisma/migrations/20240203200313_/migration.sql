/*
  Warnings:

  - The primary key for the `song_user_plays` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "song_user_plays" DROP CONSTRAINT "song_user_plays_pkey",
ADD CONSTRAINT "song_user_plays_pkey" PRIMARY KEY ("playedAt", "songId");
