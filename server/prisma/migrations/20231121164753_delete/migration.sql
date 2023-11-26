/*
  Warnings:

  - You are about to drop the `_auctionTocustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_auctionTocustomer` DROP FOREIGN KEY `_auctionTocustomer_A_fkey`;

-- DropForeignKey
ALTER TABLE `_auctionTocustomer` DROP FOREIGN KEY `_auctionTocustomer_B_fkey`;

-- DropTable
DROP TABLE `_auctionTocustomer`;
