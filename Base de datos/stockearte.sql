-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema stockearte
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema stockearte
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stockearte` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `stockearte` ;

-- -----------------------------------------------------
-- Table `stockearte`.`Producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockearte`.`Producto` (
  `id` INT NOT NULL,
  `codigo` VARCHAR(10) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `talle` VARCHAR(45) NOT NULL,
  `foto` VARCHAR(45) NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `stockearte`.`Tienda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockearte`.`Tienda` (
  `id` INT NOT NULL,
  `codigo` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  `provincia` VARCHAR(45) NOT NULL,
  `habilitada` TINYINT NOT NULL,
  `central` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '	';


-- -----------------------------------------------------
-- Table `stockearte`.`Tienda_X_Producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockearte`.`Tienda_X_Producto` (
  `Producto_id` INT NOT NULL,
  `Tienda_id` INT NOT NULL,
  `stock` INT NOT NULL,
  INDEX `fk_Tienda_has_Producto_Producto1_idx` (`Producto_id` ASC) VISIBLE,
  INDEX `fk_Tienda_has_Producto_Tienda1_idx` (`Tienda_id` ASC) VISIBLE,
  CONSTRAINT `fk_Tienda_has_Producto_Producto1`
    FOREIGN KEY (`Producto_id`)
    REFERENCES `stockearte`.`Producto` (`id`),
  CONSTRAINT `fk_Tienda_has_Producto_Tienda1`
    FOREIGN KEY (`Tienda_id`)
    REFERENCES `stockearte`.`Tienda` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `stockearte`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockearte`.`Usuario` (
  `id` INT NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `habilitado` TINYINT NOT NULL,
  `Tienda_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Usuario_Tienda_idx` (`Tienda_id` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Tienda`
    FOREIGN KEY (`Tienda_id`)
    REFERENCES `stockearte`.`Tienda` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
