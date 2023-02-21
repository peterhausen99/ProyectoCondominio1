/*
  Warnings:

  - Added the required column `idResidencia` to the `AsignacionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Informacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mensaje` to the `Informacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Informacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `asignacionplan` ADD COLUMN `idResidencia` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `informacion` ADD COLUMN `estado` VARCHAR(191) NOT NULL,
    ADD COLUMN `mensaje` VARCHAR(191) NOT NULL,
    ADD COLUMN `titulo` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `AsignacionPlan` ADD CONSTRAINT `AsignacionPlan_idResidencia_fkey` FOREIGN KEY (`idResidencia`) REFERENCES `Residencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
