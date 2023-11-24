-- DropForeignKey
ALTER TABLE `auction` DROP FOREIGN KEY `auction_auctioneerId_fkey`;

-- DropForeignKey
ALTER TABLE `auction` DROP FOREIGN KEY `auction_plate_id_fkey`;

-- DropForeignKey
ALTER TABLE `plate` DROP FOREIGN KEY `plate_ownerId_fkey`;

-- AlterTable
ALTER TABLE `auction` MODIFY `date` DATETIME(3) NULL,
    MODIFY `plate_id` INTEGER NULL,
    MODIFY `auctioneerId` INTEGER NULL;

-- AlterTable
ALTER TABLE `plate` MODIFY `price` INTEGER NULL,
    MODIFY `ownerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `plate` ADD CONSTRAINT `plate_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auction` ADD CONSTRAINT `auction_plate_id_fkey` FOREIGN KEY (`plate_id`) REFERENCES `plate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auction` ADD CONSTRAINT `auction_auctioneerId_fkey` FOREIGN KEY (`auctioneerId`) REFERENCES `auctioneer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
