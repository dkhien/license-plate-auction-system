-- CreateTable
CREATE TABLE `code` (
    `code` INTEGER NOT NULL,
    `auctionId` INTEGER NOT NULL,
    `customerId` INTEGER NOT NULL,

    UNIQUE INDEX `code_auctionId_customerId_code_key`(`auctionId`, `customerId`, `code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `code` ADD CONSTRAINT `code_auctionId_fkey` FOREIGN KEY (`auctionId`) REFERENCES `auction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `code` ADD CONSTRAINT `code_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
