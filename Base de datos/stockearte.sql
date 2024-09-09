-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-09-2024 a las 00:17:25
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
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `codigo` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `talle` varchar(50) NOT NULL,
  `foto` longblob NOT NULL,
  `color` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('sanji32542', 'Lacoste 1920', 'Las Toninas', 'Buenos Aires', 0, 0),
('xcbewu13', 'Canarias 1850', 'Ciudad de  Cordoba', 'Cordoba', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda_x_producto`
--

CREATE TABLE `tienda_x_producto` (
  `tienda_codigo` varchar(50) NOT NULL,
  `producto_codigo` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(13, 'El Pepo', '12345', 'Pepe', 'Argento', 1, 'sanji32542'),
(14, 'La Peluca', 'qwerty', 'Moni', 'Argento', 1, 'asdfgh987'),
(15, 'The One', 'fñnbqio_@748e5a', 'Unlero', 'Sistemas', 0, 'asdfgh987'),
(16, 'H-H', '564sdgf', 'Horacio', 'Hernandez', 1, 'sanji32542');

--
-- Índices para tablas volcadas
--

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
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

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
