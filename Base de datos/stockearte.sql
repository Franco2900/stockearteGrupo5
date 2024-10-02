-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-10-2024 a las 21:27:00
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `stockearte`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `despacho`
--

CREATE TABLE `despacho` (
  `id` int(11) NOT NULL,
  `id_orden_de_compra` int(11) NOT NULL,
  `fecha_de_envio` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `producto_codigo` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `talle` varchar(50) NOT NULL,
  `cantidad_solicitada` int(11) NOT NULL,
  `id_orden_de_compra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `codigo` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `talle` varchar(50) NOT NULL,
  `foto` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`codigo`, `nombre`, `talle`, `foto`, `color`) VALUES
('BBBB', 'Gorra', 'L', 'urlFoto1', 'Gris'),
('CCCCC', 'SAFJ', 'QQ', 'ASFD', 'BGER'),
('fasf', 'ewfwe', 'fwe', 'asdf', 'das');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_de_compra`
--

CREATE TABLE `orden_de_compra` (
  `id` int(11) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `observaciones` varchar(100) DEFAULT NULL,
  `fecha_de_solicitud` date NOT NULL,
  `fecha_de_recepcion` date DEFAULT NULL,
  `tienda_codigo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `codigo` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `talle` varchar(50) NOT NULL,
  `foto` longblob NOT NULL,
  `color` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`codigo`, `nombre`, `talle`, `foto`, `color`) VALUES
('CB123', 'Camisa Básica', 'M', 0x626173653634737472696e6731, 'Rojo'),
('PJ456', 'Pantalones Jeans', 'L', 0x626173653634737472696e6732, 'Azul');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

CREATE TABLE `tienda` (
  `codigo` varchar(50) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `provincia` varchar(50) NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `central` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`codigo`, `direccion`, `ciudad`, `provincia`, `habilitado`, `central`) VALUES
('asdfgh987', 'Juan Justo 200', 'Monte Chingolo', 'Buenos Aires', 1, 0),
('lmno456stu', 'Calle Falsa 123', 'La Plata', 'Buenos Aires', 0, 0),
('pqr789xyz', 'Av. Libertador 3000', 'Buenos Aires', 'Buenos Aires', 1, 0),
('sanji32542', 'Lacoste 1920', 'Las Toninas', 'Buenos Aires', 0, 1),
('wxyz123abc', 'Avenida San Martín 456', 'Rosario', 'Santa Fe', 1, 0),
('xcbewu13', 'Canarias 1850', 'Ciudad de Cordoba', 'Cordoba', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda_x_producto`
--

CREATE TABLE `tienda_x_producto` (
  `tienda_codigo` varchar(50) NOT NULL,
  `producto_codigo` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tienda_x_producto`
--

INSERT INTO `tienda_x_producto` (`tienda_codigo`, `producto_codigo`, `stock`) VALUES
('asdfgh987', 'CB123', 0),
('sanji32542', 'CB123', 0),
('wxyz123abc', 'PJ456', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `tienda_codigo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `password`, `nombre`, `apellido`, `habilitado`, `tienda_codigo`) VALUES
(165, 'Racing Campeon', '1967', 'Pepe', 'Argento', 1, 'sanji32542'),
(166, 'La Peluca', 'qwerty', 'Moni', 'Argento', 1, 'asdfgh987'),
(167, 'The One', 'fñnbqio_@748e5a', 'Unlero', 'Sistemas', 0, 'asdfgh987'),
(168, 'H-H', '564sdgf', 'Horacio', 'Hernandez', 1, 'sanji32542'),
(169, 'LG', 'dstew23', 'Luis', 'Gonzalez', 0, 'pqr789xyz'),
(170, 'El curioso', 'xznwqw@', 'Jorge', 'Perez', 1, 'lmno456stu'),
(171, 'Manu', 'liecw', 'Manuel', 'Avilar', 1, 'wxyz123abc');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `despacho`
--
ALTER TABLE `despacho`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_orden_de_compra` (`id_orden_de_compra`);

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_orden_de_compra` (`id_orden_de_compra`);

--
-- Indices de la tabla `orden_de_compra`
--
ALTER TABLE `orden_de_compra`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `tienda_x_producto`
--
ALTER TABLE `tienda_x_producto`
  ADD KEY `tienda_id` (`tienda_codigo`,`producto_codigo`),
  ADD KEY `tienda_id_2` (`tienda_codigo`,`producto_codigo`),
  ADD KEY `producto_codigo` (`producto_codigo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tienda_id` (`tienda_codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `despacho`
--
ALTER TABLE `despacho`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `despacho`
--
ALTER TABLE `despacho`
  ADD CONSTRAINT `despacho_ibfk_1` FOREIGN KEY (`id_orden_de_compra`) REFERENCES `orden_de_compra` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`id_orden_de_compra`) REFERENCES `orden_de_compra` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tienda_x_producto`
--
ALTER TABLE `tienda_x_producto`
  ADD CONSTRAINT `tienda_x_producto_ibfk_1` FOREIGN KEY (`tienda_codigo`) REFERENCES `tienda` (`codigo`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tienda_x_producto_ibfk_2` FOREIGN KEY (`producto_codigo`) REFERENCES `producto` (`codigo`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`tienda_codigo`) REFERENCES `tienda` (`codigo`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
