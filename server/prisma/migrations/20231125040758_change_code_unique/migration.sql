/*
  Warnings:

  - A unique constraint covering the columns `[customerId,code]` on the table `code` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `code_auctionId_customerId_code_key` ON `code`;

-- CreateIndex
CREATE UNIQUE INDEX `code_customerId_code_key` ON `code`(`customerId`, `code`);
