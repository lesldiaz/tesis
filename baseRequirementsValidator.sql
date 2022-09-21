-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema vraw
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema vraw
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `vraw` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `vraw` ;

-- -----------------------------------------------------
-- Table `vraw`.`bloque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vraw`.`bloque` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_At` DATETIME NULL DEFAULT NULL,
  `updated_At` DATETIME NULL DEFAULT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `bloque` VALUES (1,'2022-09-21 00:25:29','2022-09-21 00:25:29','Answer'),(2,'2022-09-21 00:25:29','2022-09-21 00:25:29','Manage'),(3,'2022-09-21 00:25:29','2022-09-21 00:25:29','Get luck'),(4,'2022-09-21 00:25:29','2022-09-21 00:25:29','Shoot'),(5,'2022-09-21 00:25:29','2022-09-21 00:25:29','Create'),(6,'2022-09-21 00:25:29','2022-09-21 00:25:29','Block'),(7,'2022-09-21 00:25:29','2022-09-21 00:25:29','Pick up'),(8,'2022-09-21 00:25:29','2022-09-21 00:25:29','Destroy'),(9,'2022-09-21 00:25:29','2022-09-21 00:25:29','Move'),(10,'2022-09-21 00:25:29','2022-09-21 00:25:29','Avoid'),(11,'2022-09-21 00:25:29','2022-09-21 00:25:29','Hold'),(12,'2022-09-21 00:25:29','2022-09-21 00:25:29','Position'),(13,'2022-09-21 00:25:29','2022-09-21 00:25:29','Time'),(14,'2022-09-21 00:25:29','2022-09-21 00:25:29','Score'),(15,'2022-09-21 00:25:29','2022-09-21 00:25:29','Toy');

-- -----------------------------------------------------
-- Table `vraw`.`participante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vraw`.`participante` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_At` DATETIME NULL DEFAULT NULL,
  `updated_At` DATETIME NULL DEFAULT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `apellido` VARCHAR(200) NOT NULL,
  `funcion` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vraw`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vraw`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_At` DATETIME NULL DEFAULT NULL,
  `updated_At` DATETIME NULL DEFAULT NULL,
  `nombreUsuario` VARCHAR(50) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `contrasenia` VARCHAR(50) NOT NULL,
  `contraseniaTemporal` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vraw`.`proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vraw`.`proyecto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_At` DATETIME NULL DEFAULT NULL,
  `updated_At` DATETIME NULL DEFAULT NULL,
  `idProyecto` VARCHAR(10) NULL DEFAULT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `estado` VARCHAR(2) NOT NULL DEFAULT 'I',
  `tipo_proyecto` VARCHAR(2) NOT NULL DEFAULT 'C',
  `duplicado` TINYINT NOT NULL DEFAULT '0',
  `usuarioId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_05eeebf9471bfd244c7953f89eb` (`usuarioId` ASC) VISIBLE,
  CONSTRAINT `FK_05eeebf9471bfd244c7953f89eb`
    FOREIGN KEY (`usuarioId`)
    REFERENCES `vraw`.`usuario` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vraw`.`participante_proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vraw`.`participante_proyecto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_At` DATETIME NULL DEFAULT NULL,
  `updated_At` DATETIME NULL DEFAULT NULL,
  `proyectoId` INT NOT NULL,
  `participanteId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_947efb7171427bd81a69d8591fb` (`proyectoId` ASC) VISIBLE,
  INDEX `FK_ac81d5e284af40634c2df0b0bc2` (`participanteId` ASC) VISIBLE,
  CONSTRAINT `FK_947efb7171427bd81a69d8591fb`
    FOREIGN KEY (`proyectoId`)
    REFERENCES `vraw`.`proyecto` (`id`),
  CONSTRAINT `FK_ac81d5e284af40634c2df0b0bc2`
    FOREIGN KEY (`participanteId`)
    REFERENCES `vraw`.`participante` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vraw`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vraw`.`rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_At` DATETIME NULL DEFAULT NULL,
  `updated_At` DATETIME NULL DEFAULT NULL,
  `nombre` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vraw`.`requerimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vraw`.`requerimiento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_At` DATETIME NULL DEFAULT NULL,
  `updated_At` DATETIME NULL DEFAULT NULL,
  `idRequerimiento` VARCHAR(10) NULL DEFAULT NULL,
  `titulo` VARCHAR(200) NULL DEFAULT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `prioridad` TINYINT NOT NULL DEFAULT '1',
  `estado` TINYINT NOT NULL DEFAULT '0',
  `esReqBloque` TINYINT NOT NULL DEFAULT '0',
  `requerimientoPadreID` VARCHAR(255) NULL DEFAULT NULL,
  `rolId` INT NULL DEFAULT NULL,
  `proyectoId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_e350aed9b3343e4b3c7fdc676a2` (`rolId` ASC) VISIBLE,
  INDEX `FK_5cc3ac79b44fd84e8c7aa966875` (`proyectoId` ASC) VISIBLE,
  CONSTRAINT `FK_5cc3ac79b44fd84e8c7aa966875`
    FOREIGN KEY (`proyectoId`)
    REFERENCES `vraw`.`proyecto` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_e350aed9b3343e4b3c7fdc676a2`
    FOREIGN KEY (`rolId`)
    REFERENCES `vraw`.`rol` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vraw`.`proposito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vraw`.`proposito` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_At` DATETIME NULL DEFAULT NULL,
  `updated_At` DATETIME NULL DEFAULT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `es_principal` TINYINT NOT NULL DEFAULT '0',
  `requerimientoId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_20f61a734210963162584170705` (`requerimientoId` ASC) VISIBLE,
  CONSTRAINT `FK_20f61a734210963162584170705`
    FOREIGN KEY (`requerimientoId`)
    REFERENCES `vraw`.`requerimiento` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vraw`.`requerimiento-bloque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vraw`.`requerimiento-bloque` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_At` DATETIME NULL DEFAULT NULL,
  `updated_At` DATETIME NULL DEFAULT NULL,
  `bloqueId` INT NOT NULL,
  `requerimientoId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_a88d60f29b9101bc98e8fb60b7f` (`bloqueId` ASC) VISIBLE,
  INDEX `FK_4378f3569d7b82ccd5c02cfdfb2` (`requerimientoId` ASC) VISIBLE,
  CONSTRAINT `FK_4378f3569d7b82ccd5c02cfdfb2`
    FOREIGN KEY (`requerimientoId`)
    REFERENCES `vraw`.`requerimiento` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_a88d60f29b9101bc98e8fb60b7f`
    FOREIGN KEY (`bloqueId`)
    REFERENCES `vraw`.`bloque` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vraw`.`resultado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vraw`.`resultado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_At` DATETIME NULL DEFAULT NULL,
  `updated_At` DATETIME NULL DEFAULT NULL,
  `correcto` TINYINT NOT NULL DEFAULT '0',
  `apropiado` TINYINT NOT NULL DEFAULT '0',
  `completo` TINYINT NOT NULL DEFAULT '0',
  `verificable` TINYINT NOT NULL DEFAULT '0',
  `factible` TINYINT NOT NULL DEFAULT '0',
  `sin_ambiguedad` TINYINT NOT NULL DEFAULT '0',
  `singular` TINYINT NOT NULL DEFAULT '0',
  `trazable` TINYINT NOT NULL DEFAULT '0',
  `modificable` TINYINT NOT NULL DEFAULT '0',
  `consistente` TINYINT NOT NULL DEFAULT '0',
  `conforme` TINYINT NOT NULL DEFAULT '0',
  `necesario` TINYINT NOT NULL DEFAULT '0',
  `observaciones` TEXT NULL DEFAULT NULL,
  `requerimientoId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_5a53fe85fc0da9cc81405859232` (`requerimientoId` ASC) VISIBLE,
  CONSTRAINT `FK_5a53fe85fc0da9cc81405859232`
    FOREIGN KEY (`requerimientoId`)
    REFERENCES `vraw`.`requerimiento` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `vraw`.`usuario_sesion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vraw`.`usuario_sesion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_At` DATETIME NULL DEFAULT NULL,
  `updated_At` DATETIME NULL DEFAULT NULL,
  `fechaInicioSesionActual` DATETIME NOT NULL,
  `fechaInicioSesionAnterior` DATETIME NULL DEFAULT NULL,
  `usuarioId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_490098166170f8d6fd01dfaf287` (`usuarioId` ASC) VISIBLE,
  CONSTRAINT `FK_490098166170f8d6fd01dfaf287`
    FOREIGN KEY (`usuarioId`)
    REFERENCES `vraw`.`usuario` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
