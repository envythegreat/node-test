/*
  Warnings:

  - Added the required column `accessToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `accessToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL;