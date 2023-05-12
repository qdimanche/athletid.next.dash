/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Section` DROP FOREIGN KEY `Section_postId_fkey`;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `Section`;

-- CreateTable
CREATE TABLE `FrenchCategory` (
    `name` VARCHAR(191) NOT NULL DEFAULT 'undefined',
    `undefined_category_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FrenchCategory_name_key`(`name`),
    PRIMARY KEY (`undefined_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FrenchPost` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `img` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL DEFAULT 'undefined',
    `categoryId` VARCHAR(191) NOT NULL,

    INDEX `FrenchPost_authorId_id_idx`(`authorId`, `id`),
    INDEX `FrenchPost_categoryId_id_idx`(`categoryId`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FrenchSection` (
    `id` VARCHAR(191) NOT NULL,
    `subTitle` VARCHAR(191) NOT NULL,
    `paragraph` VARCHAR(10000) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,

    INDEX `FrenchSection_postId_id_idx`(`postId`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FrenchPost` ADD CONSTRAINT `FrenchPost_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FrenchPost` ADD CONSTRAINT `FrenchPost_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `FrenchCategory`(`undefined_category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FrenchSection` ADD CONSTRAINT `FrenchSection_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `FrenchPost`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
