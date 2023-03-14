/*
  Warnings:

  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idCedula` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `idUsuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `incidencia` DROP FOREIGN KEY `Incidencia_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `reserva` DROP FOREIGN KEY `Reserva_idUsuario_fkey`;

-- DropForeignKey
ALTER TABLE `residencia` DROP FOREIGN KEY `Residencia_idUsuario_fkey`;

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    DROP COLUMN `idCedula`,
    ADD COLUMN `idUsuario` INTEGER NOT NULL,
    ADD PRIMARY KEY (`idUsuario`);

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Incidencia` ADD CONSTRAINT `Incidencia_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residencia` ADD CONSTRAINT `Residencia_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
