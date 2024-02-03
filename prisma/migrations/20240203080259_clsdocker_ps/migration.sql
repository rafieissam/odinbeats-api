/*
  Warnings:

  - You are about to drop the column `order` on the `playlist_songs` table. All the data in the column will be lost.
  - You are about to drop the column `albumId` on the `songs` table. All the data in the column will be lost.
  - You are about to drop the column `artistId` on the `songs` table. All the data in the column will be lost.
  - You are about to drop the column `format` on the `songs` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `songs` table. All the data in the column will be lost.
  - You are about to drop the `_AlbumToGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtistToGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArtistToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToSong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `albums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genres` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `artist` to the `songs` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE "songs" DROP CONSTRAINT "songs_albumId_fkey";

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_artistId_fkey";

-- AlterTable
ALTER TABLE "playlist_songs" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "songs" DROP COLUMN "albumId",
DROP COLUMN "artistId",
DROP COLUMN "format",
DROP COLUMN "image",
ADD COLUMN     "artist" TEXT NOT NULL;

-- DropTable
DROP TABLE "_AlbumToGenre";

-- DropTable
DROP TABLE "_ArtistToGenre";

-- DropTable
DROP TABLE "_ArtistToUser";

-- DropTable
DROP TABLE "_GenreToSong";

-- DropTable
DROP TABLE "albums";

-- DropTable
DROP TABLE "artists";

-- DropTable
DROP TABLE "genres";
