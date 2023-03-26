/*
  Warnings:

  - Added the required column `tipo` to the `Informacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `informacion` ADD COLUMN `tipo` VARCHAR(191) NOT NULL;
