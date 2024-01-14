/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");
