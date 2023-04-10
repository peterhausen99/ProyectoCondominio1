/*
  Warnings:

  - Added the required column `detalles` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reserva` ADD COLUMN `detalles` VARCHAR(191) NOT NULL,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL,
    ADD COLUMN `horario` VARCHAR(191) NOT NULL;
