/*
  Warnings:

  - Added the required column `diaReservacion` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reserva` ADD COLUMN `diaReservacion` DATETIME(3) NOT NULL;
