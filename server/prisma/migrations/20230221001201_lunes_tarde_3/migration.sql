/*
  Warnings:

  - You are about to alter the column `iva` on the `asignacionplan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `total` on the `asignacionplan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `totalPlan` on the `plan` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `valor` on the `rubro` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `idAsignacionPlan` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `asignacionplan` MODIFY `iva` DECIMAL(10, 2) NOT NULL,
    MODIFY `total` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `plan` ADD COLUMN `idAsignacionPlan` INTEGER NOT NULL,
    MODIFY `totalPlan` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `rubro` MODIFY `valor` DECIMAL(10, 2) NOT NULL;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_idAsignacionPlan_fkey` FOREIGN KEY (`idAsignacionPlan`) REFERENCES `AsignacionPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
