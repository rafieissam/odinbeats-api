/*
  Warnings:

  - The primary key for the `albums` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `artists` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `playlist_songs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `playlists` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `song_user_plays` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `songs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_AlbumToGenre" DROP CONSTRAINT "_AlbumToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToGenre" DROP CONSTRAINT "_AlbumToGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToGenre" DROP CONSTRAINT "_ArtistToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToGenre" DROP CONSTRAINT "_ArtistToGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToUser" DROP CONSTRAINT "_ArtistToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToUser" DROP CONSTRAINT "_ArtistToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToSong" DROP CONSTRAINT "_GenreToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToSong" DROP CONSTRAINT "_GenreToSong_B_fkey";

-- DropForeignKey
ALTER TABLE "albums" DROP CONSTRAINT "albums_artistId_fkey";

-- DropForeignKey
ALTER TABLE "playlist_songs" DROP CONSTRAINT "playlist_songs_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "playlist_songs" DROP CONSTRAINT "playlist_songs_songId_fkey";

-- DropForeignKey
ALTER TABLE "playlists" DROP CONSTRAINT "playlists_userId_fkey";

-- DropForeignKey
ALTER TABLE "song_user_plays" DROP CONSTRAINT "song_user_plays_songId_fkey";

-- DropForeignKey
ALTER TABLE "song_user_plays" DROP CONSTRAINT "song_user_plays_userId_fkey";

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_albumId_fkey";

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_artistId_fkey";

-- AlterTable
ALTER TABLE "_AlbumToGenre" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ArtistToGenre" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ArtistToUser" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_GenreToSong" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "albums" DROP CONSTRAINT "albums_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "artistId" SET DATA TYPE TEXT,
ADD CONSTRAINT "albums_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "albums_id_seq";

-- AlterTable
ALTER TABLE "artists" DROP CONSTRAINT "artists_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "artists_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "artists_id_seq";

-- AlterTable
ALTER TABLE "genres" DROP CONSTRAINT "genres_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "genres_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "genres_id_seq";

-- AlterTable
ALTER TABLE "playlist_songs" DROP CONSTRAINT "playlist_songs_pkey",
ALTER COLUMN "songId" SET DATA TYPE TEXT,
ALTER COLUMN "playlistId" SET DATA TYPE TEXT,
ADD CONSTRAINT "playlist_songs_pkey" PRIMARY KEY ("songId", "playlistId");

-- AlterTable
ALTER TABLE "playlists" DROP CONSTRAINT "playlists_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "playlists_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "playlists_id_seq";

-- AlterTable
ALTER TABLE "song_user_plays" DROP CONSTRAINT "song_user_plays_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "songId" SET DATA TYPE TEXT,
ADD CONSTRAINT "song_user_plays_pkey" PRIMARY KEY ("userId", "songId");

-- AlterTable
ALTER TABLE "songs" DROP CONSTRAINT "songs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "artistId" SET DATA TYPE TEXT,
ALTER COLUMN "albumId" SET DATA TYPE TEXT,
ADD CONSTRAINT "songs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "songs_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "liked_songs" (
    "songId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "liked_songs_pkey" PRIMARY KEY ("songId","userId")
);

-- AddForeignKey
ALTER TABLE "playlists" ADD CONSTRAINT "playlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_songs" ADD CONSTRAINT "liked_songs_songId_fkey" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_songs" ADD CONSTRAINT "liked_songs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_songs" ADD CONSTRAINT "playlist_songs_songId_fkey" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_songs" ADD CONSTRAINT "playlist_songs_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "albums" ADD CONSTRAINT "albums_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "song_user_plays" ADD CONSTRAINT "song_user_plays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "song_user_plays" ADD CONSTRAINT "song_user_plays_songId_fkey" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToSong" ADD CONSTRAINT "_GenreToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToSong" ADD CONSTRAINT "_GenreToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToGenre" ADD CONSTRAINT "_ArtistToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToGenre" ADD CONSTRAINT "_ArtistToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToUser" ADD CONSTRAINT "_ArtistToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToUser" ADD CONSTRAINT "_ArtistToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToGenre" ADD CONSTRAINT "_AlbumToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToGenre" ADD CONSTRAINT "_AlbumToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;
