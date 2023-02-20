/*
  Warnings:

  - Added the required column `idUsuario` to the `Incidencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idAreaComun` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `Residencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `incidencia` ADD COLUMN `idUsuario` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reserva` ADD COLUMN `idAreaComun` INTEGER NOT NULL,
    ADD COLUMN `idUsuario` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `residencia` ADD COLUMN `idUsuario` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idCedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_idAreaComun_fkey` FOREIGN KEY (`idAreaComun`) REFERENCES `AreaComun`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residencia` ADD CONSTRAINT `Residencia_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idCedula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Incidencia` ADD CONSTRAINT `Incidencia_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idCedula`) ON DELETE RESTRICT ON UPDATE CASCADE;
