-- AlterTable
ALTER TABLE `plate` ADD COLUMN `status` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_auctionTocustomer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_auctionTocustomer_AB_unique`(`A`, `B`),
    INDEX `_auctionTocustomer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_auctionTocustomer` ADD CONSTRAINT `_auctionTocustomer_A_fkey` FOREIGN KEY (`A`) REFERENCES `auction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_auctionTocustomer` ADD CONSTRAINT `_auctionTocustomer_B_fkey` FOREIGN KEY (`B`) REFERENCES `customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
