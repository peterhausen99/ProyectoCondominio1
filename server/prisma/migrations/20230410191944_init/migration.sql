/*
  Warnings:

  - You are about to drop the column `detalles` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `diaReservacion` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `horario` on the `reserva` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reserva` DROP COLUMN `detalles`,
    DROP COLUMN `diaReservacion`,
    DROP COLUMN `estado`,
    DROP COLUMN `horario`;
