/*
  Warnings:

  - You are about to drop the `FrenchCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FrenchPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FrenchSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FrenchPost` DROP FOREIGN KEY `FrenchPost_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `FrenchPost` DROP FOREIGN KEY `FrenchPost_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `FrenchSection` DROP FOREIGN KEY `FrenchSection_postId_fkey`;

-- DropTable
DROP TABLE `FrenchCategory`;

-- DropTable
DROP TABLE `FrenchPost`;

-- DropTable
DROP TABLE `FrenchSection`;

-- CreateTable
CREATE TABLE `Category` (
    `name` VARCHAR(191) NOT NULL DEFAULT 'undefined',
    `undefined_category_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`undefined_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `img` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL DEFAULT 'undefined',
    `categoryId` VARCHAR(191) NOT NULL,

    INDEX `Post_authorId_id_idx`(`authorId`, `id`),
    INDEX `Post_categoryId_id_idx`(`categoryId`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Section` (
    `id` VARCHAR(191) NOT NULL,
    `subTitle` VARCHAR(191) NOT NULL,
    `paragraph` VARCHAR(10000) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,

    INDEX `Section_postId_id_idx`(`postId`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`undefined_category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
