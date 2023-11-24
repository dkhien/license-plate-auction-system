/*
  Warnings:

  - You are about to drop the column `email` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `auctioneer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `auctioneer` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `auctioneer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `auctioneer` table. All the data in the column will be lost.
  - You are about to drop the column `citizenId` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `auctioneer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `auctioneer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `phone`,
    ADD COLUMN `accountId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `auctioneer` DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `phone`,
    ADD COLUMN `accountId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `citizenId`,
    DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `phone`,
    ADD COLUMN `accountId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `citizenId` VARCHAR(191) NOT NULL,
    `role` ENUM('CUSTOMER', 'AUCTIONEER', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `admin_accountId_key` ON `admin`(`accountId`);

-- CreateIndex
CREATE UNIQUE INDEX `auctioneer_accountId_key` ON `auctioneer`(`accountId`);

-- CreateIndex
CREATE UNIQUE INDEX `customer_accountId_key` ON `customer`(`accountId`);

-- AddForeignKey
ALTER TABLE `auctioneer` ADD CONSTRAINT `auctioneer_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
