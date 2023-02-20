-- CreateTable
CREATE TABLE `PerfilUsuario` (
    `id` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `idCedula` INTEGER NOT NULL,
    `perfilUsuarioId` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido1` VARCHAR(191) NOT NULL,
    `apellido2` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasenna` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`idCedula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_perfilUsuarioId_fkey` FOREIGN KEY (`perfilUsuarioId`) REFERENCES `PerfilUsuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
