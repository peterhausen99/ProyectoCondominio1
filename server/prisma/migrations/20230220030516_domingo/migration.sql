-- CreateTable
CREATE TABLE `Reserva` (
    `id` INTEGER NOT NULL,
    `diaReservacion` DATETIME(3) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `detalles` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AreaComun` (
    `id` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `capacidad` INTEGER NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Residencia` (
    `id` INTEGER NOT NULL,
    `cantidadPersonas` INTEGER NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `annoInicio` DATETIME(3) NOT NULL,
    `cantidadCarros` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Incidencia` (
    `id` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
