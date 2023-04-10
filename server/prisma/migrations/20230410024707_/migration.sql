/*
  Warnings:

  - You are about to drop the column `capacidad` on the `areacomun` table. All the data in the column will be lost.
  - Added the required column `horario` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `areacomun` DROP COLUMN `capacidad`;

-- AlterTable
ALTER TABLE `reserva` ADD COLUMN `horario` VARCHAR(191) NOT NULL;
