/*
  Warnings:

  - Added the required column `titulo` to the `Incidencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `incidencia` ADD COLUMN `titulo` VARCHAR(191) NOT NULL;
