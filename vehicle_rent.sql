-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2022 at 03:37 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle_rent`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Bike', '2022-02-02 13:31:51', NULL),
(2, 'Cars', '2022-02-02 13:33:00', NULL),
(3, 'motorcycle', '2022-02-02 13:33:04', '2022-02-02 13:55:52');

-- --------------------------------------------------------

--
-- Table structure for table `email_verification`
--

CREATE TABLE `email_verification` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `isExpired` tinyint(4) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `email_verification`
--

INSERT INTO `email_verification` (`id`, `user_id`, `code`, `isExpired`, `createdAt`, `updatedAt`) VALUES
(1, 24, '8200796', 1, '2022-02-14 22:57:03', '2022-02-15 09:24:35');

-- --------------------------------------------------------

--
-- Table structure for table `forgot_password`
--

CREATE TABLE `forgot_password` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `isExpired` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `forgot_password`
--

INSERT INTO `forgot_password` (`id`, `user_id`, `code`, `isExpired`, `createdAt`, `updatedAt`) VALUES
(11, 16, 12003, 1, '2022-02-12 11:04:14', '2022-02-12 11:05:03'),
(12, 16, 671739, 0, '2022-02-12 11:05:37', NULL),
(13, 20, 479075, 1, '2022-02-14 15:43:30', '2022-02-14 15:44:50');

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `rentStartDate` date DEFAULT NULL,
  `rentEndDate` date DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `prepayment` decimal(18,4) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `user_id`, `vehicle_id`, `rentStartDate`, `rentEndDate`, `qty`, `prepayment`, `payment_id`, `status_id`, `createdAt`, `updatedAt`) VALUES
(1, 4, 5, '2022-02-02', '2022-02-04', 4, '145000.0000', 0, 1, '2022-02-27 14:45:38', NULL),
(2, 4, 26, '2022-03-01', '2022-03-03', 4, '145000.0000', 0, 1, '2022-02-27 22:37:54', NULL),
(3, 5, 27, '2022-03-01', '2022-03-03', 4, '145000.0000', 0, 1, '2022-02-27 22:39:29', NULL),
(4, 6, 28, '2022-03-01', '2022-03-03', 4, '145000.0000', 0, 1, '2022-02-27 22:39:40', NULL),
(5, 5, 50, '2022-03-01', '2022-03-03', 4, '145000.0000', 1, 1, '2022-02-27 22:39:52', NULL),
(6, 4, 26, '2022-03-01', '2022-03-03', 4, '145000.0000', 1, 1, '2022-02-27 22:40:39', NULL),
(7, 3, 5, '2022-03-05', '2022-03-06', 4, '145000.0000', 1, 1, '2022-02-27 22:43:31', NULL),
(8, 3, 5, '2022-02-28', '2022-03-01', 4, '145000.0000', 1, 1, '2022-02-27 22:55:00', NULL),
(9, 4, 5, '2022-03-05', '2022-03-06', 4, '145000.0000', 1, 1, '2022-02-28 23:00:31', NULL),
(10, 3, 5, '2022-03-05', '2022-03-06', 4, '145000.0000', 1, 1, '2022-02-28 23:00:45', NULL),
(11, 2, 26, '2022-03-08', '2022-03-09', 4, '145000.0000', 2, 1, '2022-02-28 23:01:08', NULL),
(12, 3, 26, '2022-03-08', '2022-03-09', 4, '145000.0000', 2, 1, '2022-02-28 23:01:30', NULL),
(13, 5, 28, '2022-03-09', '2022-03-10', 4, '145000.0000', 2, 1, '2022-02-28 23:01:55', NULL),
(15, 6, 28, '2022-03-09', '2022-03-10', 4, '145000.0000', 2, 1, '2022-02-28 23:02:55', NULL),
(16, 4, 50, '2022-03-09', '2022-03-10', 4, '145000.0000', 2, 1, '2022-02-28 23:04:37', NULL),
(17, 5, 27, '2022-03-10', '2022-03-11', 4, '145000.0000', 2, 1, '2022-02-28 23:05:03', NULL),
(18, 3, 27, '2022-03-10', '2022-03-11', 4, '145000.0000', 2, 1, '2022-02-28 23:05:19', NULL),
(19, 5, 50, '2022-03-10', '2022-03-11', 4, '145000.0000', 2, 1, '2022-02-28 23:05:36', NULL),
(20, 3, 27, '2022-03-10', '2022-03-11', 4, '145000.0000', 2, 1, '2022-02-28 23:06:15', NULL),
(21, 3, 27, '2022-03-10', '2022-03-11', 4, '145000.0000', 0, 1, '2022-03-04 16:57:48', NULL),
(22, 3, 29, '2022-03-05', '2022-03-07', 2, '0.0000', 0, 7, '2022-03-04 20:06:21', NULL),
(23, 3, 29, '2022-03-05', '2022-03-07', 2, '0.0000', 0, 7, '2022-03-04 20:06:53', NULL),
(24, 3, 29, '2022-03-10', '2022-03-11', 4, '145000.0000', 0, 7, '2022-03-04 20:07:30', NULL),
(25, 3, 29, '2022-03-10', '2022-03-11', 4, '145000.0000', 0, 7, '2022-03-04 20:10:11', NULL),
(26, 3, 29, '2022-03-05', '2022-03-07', 2, '0.0000', 0, 7, '2022-03-04 20:10:18', NULL),
(27, 3, 29, '2022-03-04', '2022-03-06', 3, '0.0000', 0, 7, '2022-03-04 20:15:03', NULL),
(28, 3, 29, '2022-03-08', '2022-03-11', 2, '0.0000', 0, 7, '2022-03-04 20:25:03', NULL),
(29, 3, 29, '2022-03-09', '2022-03-11', 2, '0.0000', 0, 7, '2022-03-04 20:26:07', NULL),
(30, 3, 50, '2022-03-10', '2022-03-11', 4, '145000.0000', 0, 7, '2022-03-04 20:26:26', NULL),
(31, 5, 53, '2022-03-10', '2022-03-11', 4, '145000.0000', 0, 7, '2022-03-04 20:28:05', NULL),
(32, 3, 29, '2022-03-08', '2022-03-10', 2, '0.0000', 0, 7, '2022-03-04 20:28:33', NULL),
(33, 3, 3, '2022-03-11', '2022-03-13', 3, '600000.0000', 1, 2, '2022-03-04 20:31:05', NULL),
(34, 3, 3, '2022-03-11', '2022-03-13', 3, '0.0000', 0, 7, '2022-03-04 20:31:47', NULL),
(35, 3, 3, '2022-03-11', '2022-03-13', 3, '0.0000', 2, 7, '2022-03-04 20:32:52', NULL),
(36, 3, 29, '2022-03-06', '2022-03-08', 2, '0.0000', 0, 7, '2022-03-06 11:04:39', NULL),
(37, 3, 29, '2022-03-06', '2022-03-08', 2, '0.0000', 0, 7, '2022-03-06 11:06:51', NULL),
(38, 3, 29, '2022-03-06', '2022-03-07', 3, '300000.0000', 1, 2, '2022-03-06 11:37:14', NULL),
(39, 3, 29, '2022-03-06', '2022-03-07', 3, '0.0000', 0, 7, '2022-03-06 11:37:21', NULL),
(46, 24, 6, '2022-03-07', '2022-03-08', 2, '0.0000', 0, 7, '2022-03-06 12:00:53', NULL),
(47, 24, 6, '2022-03-07', '2022-03-08', 2, '0.0000', 0, 7, '2022-03-06 12:02:35', NULL),
(48, 24, 6, '2022-03-07', '2022-03-08', 2, '0.0000', 0, 7, '2022-03-06 12:02:50', NULL),
(49, 24, 16, '2022-03-07', '2022-03-08', 2, '0.0000', 0, 7, '2022-03-06 12:22:46', NULL),
(50, 24, 20, '2022-03-07', '2022-03-08', 2, '0.0000', 0, 7, '2022-03-06 12:24:22', NULL),
(53, 24, 26, '2022-03-24', '2022-03-26', 2, '600000.0000', 1, 2, '2022-03-06 14:19:34', NULL),
(54, 24, 25, '2022-03-29', '2022-03-30', 3, '300000.0000', 1, 2, '2022-03-06 14:27:09', NULL),
(55, 24, 18, '2022-03-18', '2022-03-20', 3, '600000.0000', 1, 2, '2022-03-06 22:12:43', NULL),
(58, 24, 2, '2022-03-10', '2022-03-11', 2, '200000.0000', 1, 2, '2022-03-07 04:36:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment_types`
--

CREATE TABLE `payment_types` (
  `id` int(11) NOT NULL,
  `payment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment_types`
--

INSERT INTO `payment_types` (`id`, `payment`) VALUES
(1, 'cash'),
(2, 'transder');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status` varchar(80) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Waiting to payment', '2022-02-02 14:48:32', NULL),
(2, 'Payment Success', '2022-02-02 15:00:45', NULL),
(3, 'Canceled by system', '2022-02-02 15:01:23', '2022-02-02 15:06:16'),
(4, 'Has been returned', '2022-02-02 15:02:24', '2022-02-02 15:05:28'),
(5, 'Finished', '2022-02-02 15:02:41', '2022-02-02 15:05:41'),
(7, 'No Prepayment', '2022-03-04 18:05:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(80) DEFAULT NULL,
  `nickName` varchar(80) DEFAULT NULL,
  `gender` enum('Female','Male') DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `mobileNumber` varchar(20) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `isVerified` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `nickName`, `gender`, `photo`, `address`, `birthDate`, `mobileNumber`, `email`, `username`, `password`, `isVerified`, `createdAt`, `updatedAt`) VALUES
(1, 'Adam Smith', 'Adam', 'Male', '3.jpg', 'Iskandar Street no.67 Block A Near Bus Stop', '2001-10-02', '(+62)8123456', 'adam02@gmail.com', '', '3456', 1, '2022-02-02 16:28:34', '2022-02-15 09:22:51'),
(2, 'Bella Swanstiger', 'Bella', 'Female', '1.jpg', 'Sudirman Street no 88', '1999-09-09', '089993838383', 'bella09@gmail.com', '', '456', 0, '2022-02-02 16:34:02', '2022-02-02 16:35:18'),
(3, 'Charlie Bonstain', 'Charlie', 'Male', '3.jpg', 'Iskandar Street no.67 Block A Near Bus Stop', '2001-10-02', '(+62)8123456', 'charlie02@gmail.com', '', '123', 0, '2022-02-02 16:35:28', NULL),
(4, 'Chika Wild', 'Chika', 'Female', '3.jpg', 'Sudirman Street no.87 Block B', '2001-10-02', '(+62)898765', 'chika02@gmail.com', '', '123', 0, '2022-02-03 23:32:31', NULL),
(5, 'Bianca Waston', 'Bianca', 'Female', '3.jpg', 'Sudirman Street no.87 Block B', '1995-09-08', '(+62)898765', 'candy10@gmail.com', '', '123', 0, '2022-02-03 23:40:50', '2022-02-08 23:08:21'),
(6, 'Delyn Mayer', 'Delin', 'Male', 'uploads\\Psikotes Marsella.PNG', 'Jl. ABC no 10', '2001-09-18', '0902930239', 'delin@gmail.com', 'delin_18', '$argon2i$v=19$m=4096,t=3,p=1$3rKwmsb2mJFKG8gbd0KAlw$V6yRzJD4GVaoQ3P94lU/2nw4W0Aab700BTAV4jdp+os', 0, '2022-02-10 17:12:35', '2022-02-14 15:43:11'),
(14, 'Billy Van Hotman', NULL, NULL, '', NULL, NULL, NULL, 'billy@gmail.com', 'billy_vh', '$argon2i$v=19$m=4096,t=3,p=1$6EooizMdJuJyoyujy8djIA$OzWjuLYwRR/Q4WbSrkrHoF0Kz4OfiwfedaXN59P9bIE', 1, '2022-02-11 15:27:42', '2022-02-11 15:27:42'),
(16, 'guest1', NULL, NULL, '', NULL, NULL, NULL, 'dogsegies@gmail.com', 'guest01', '$argon2i$v=19$m=4096,t=3,p=1$xuFk7wIv+MIh3yl6fdLZBg$eFCKFGaqQyVgPLvsjfaNPlT/7DRqX6Tx6aKGYQernpI', 1, '2022-02-11 23:41:58', '2022-02-12 11:05:03'),
(18, 'ajsaksjkasj', NULL, NULL, '', NULL, NULL, NULL, 'zzzzxxx@gmail.com', 'vvvvv', '$argon2i$v=19$m=4096,t=3,p=1$4bVu/sI3YREJE2VuP1RmYQ$HNVzn0nHij5zV0LISCGiiVILXbm6f2+NfWgIBUsEKeI', 1, '2022-02-12 17:37:40', '2022-02-12 17:37:40'),
(19, 'ccccc', NULL, NULL, '', NULL, NULL, NULL, 'ccc.dddd@gmail.com', 'dddd', '$argon2i$v=19$m=4096,t=3,p=1$eBkmvoe9PFRyaGaXLG0jAw$Fi4xHbSq8PAQxvOmFrT74tW03ORZ0aI71+rU3PaqmnU', 1, '2022-02-12 21:55:27', '2022-02-12 21:55:27'),
(20, 'LEWAB', NULL, NULL, '', NULL, NULL, NULL, 'lewab43008@diolang.com', 'lewab43008', '$argon2i$v=19$m=4096,t=3,p=1$QJSv45gSmNgzG1FJbiYTEQ$dEUNVnbY0Cy1gjooIGPdrjV0xvlnHrtcZ6YCgcnvPII', 1, '2022-02-14 15:41:14', '2022-02-14 15:44:50'),
(21, 'abababab', 'bbbbb', '', 'uploads\\popup detail produk.JPG', 'vvvvv', '2022-09-08', 'dsddsds', 'aaaabbb@gmail.com', 'xxxxx', '$argon2i$v=19$m=4096,t=3,p=1$oaFBOuMQ/lRjs+MxROHr4Q$5p9VLMeuVJJ/xiT4hi3FZI27ex/aejaSTEKpSJR7Y+w', 0, '2022-02-14 15:48:34', NULL),
(24, 'vosov', NULL, NULL, NULL, NULL, NULL, NULL, 'vosov61582@diolang.com', 'vosov61582', '$argon2i$v=19$m=4096,t=3,p=1$j+hXqTixDfhaepXRAz44sQ$KhnZJmLztseaeoOiZTqs4QpgVmmJ+N0asSnQFfJUiLw', 1, '2022-02-14 22:57:03', '2022-03-04 23:44:00');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `location` varchar(80) DEFAULT NULL,
  `price` decimal(18,4) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `isAvailable` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `category_id`, `photo`, `location`, `price`, `qty`, `isAvailable`, `createdAt`, `updatedAt`) VALUES
(1, 'Toyota Avanza', 2, 'uploads/toyota-avanza.jpg', 'Bandung', '100000.0000', 3, 1, '2022-01-02 15:21:12', NULL),
(2, 'Honda Beat', 3, 'uploads/honda-beat.png', 'Jakarta', '100000.0000', 4, 1, '2022-02-02 15:27:41', NULL),
(3, 'Honda Scoppy', 3, 'uploads/honda-scoppy.jpg', 'Bandung', '100000.0000', 3, 1, '2022-02-02 15:41:00', NULL),
(4, 'Honda Brio', 2, 'uploads/honda-brio.jpg', 'Bandung', '100000.0000', 3, 1, '2022-02-02 23:11:46', NULL),
(5, 'Honda BR-V', 2, 'uploads/Honda-BR-V.jpg', 'Bandung', '200000.0000', 3, 1, '2022-02-02 23:12:02', NULL),
(6, 'Honda HRV', 2, 'uploads/Honda-HRV.jpg', 'Jakarta', '100000.0000', 4, 1, '2022-02-02 23:12:20', NULL),
(7, 'Toyota Alphard', 2, 'uploads/toyota-alphard.jpg', 'Jakarta', '100000.0000', 3, 1, '2022-02-03 11:43:23', NULL),
(8, 'Toyota Agya', 2, 'uploads/toyota-agya.jpeg', 'Bandung', '100000.0000', 3, 1, '2022-02-03 13:39:36', NULL),
(9, 'Toyota Calya', 2, 'uploads/toyota-calya.jpg', 'Bandung', '100000.0000', 3, 1, '2022-02-03 23:18:33', NULL),
(12, 'Honda City', 2, 'uploads/honda-city.jpeg', 'Medan', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(13, 'Honda Accord', 2, 'uploads/honda-accord.jpg', 'Medan', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(15, 'Honda Civic', 2, 'uploads/honda-civic.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(16, 'Honda Jazz', 2, 'uploads/honda-jazz.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(17, 'Honda Mobilio', 2, 'uploads/honda-mobilio.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(18, 'Honda Odyssey', 2, 'uploads/honda-oddysey.png', 'Semarang', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(19, 'Honda WR-V', 2, 'uploads/honda-wrv.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(20, 'Toyota C-HR', 2, 'uploads/Toyota-chr.jpg', 'Jakarta', '100000.0000', 4, 1, '2022-02-05 23:08:56', NULL),
(22, 'Toyota Camry', 2, 'uploads/toyota-camry.jpg', 'Bandung', '100000.0000', 5, 1, '2022-02-05 23:08:56', NULL),
(23, 'Toyota Corolla Altis', 2, 'uploads/toyota-corolla-altis.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:08:56', NULL),
(24, 'Toyota Fortuner', 2, 'uploads/toyota-fortuner.jpeg', 'Bandung', '100000.0000', 4, 1, '2022-02-05 23:08:57', NULL),
(25, 'Toyota HiAce', 2, 'uploads/toyota-hiace.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:08:57', NULL),
(26, 'Honda Vario', 3, 'uploads/honda-vario.jpg', 'Yogyakarta', '150000.0000', 4, 1, '2022-02-05 23:16:03', NULL),
(27, 'Honda Genio', 3, 'uploads/honda-genio.jpg', 'Bali', '100000.0000', 5, 1, '2022-02-05 23:16:03', NULL),
(28, 'Yamaha XMax', 3, 'uploads/yamaha-xmax.jpg', 'Bandung', '150000.0000', 4, 1, '2022-02-05 23:16:03', NULL),
(29, 'Yamaha Fazzio', 3, 'uploads/yamaha-fazzio.jpeg', 'Yogyakarta', '100000.0000', 9, 1, '2022-02-05 23:16:03', NULL),
(50, 'Fixie', 1, 'uploads/bike1.png', 'Yogyakarta', '100000.0000', 5, 1, '2022-02-23 21:18:06', NULL),
(51, 'Sport Bike', 1, 'uploads/bike2.png', 'Kalimantan', '100000.0000', 5, 1, '2022-02-23 21:19:04', NULL),
(52, 'Onthel', 1, 'uploads/bike3.png', 'Malang', '100000.0000', 5, 1, '2022-02-23 21:19:54', NULL),
(53, 'Fixie Gray', 1, 'uploads/bike4.png', 'Yogyakarta', '100000.0000', 5, 1, '2022-02-23 21:20:29', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_verification`
--
ALTER TABLE `email_verification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forgot_password`
--
ALTER TABLE `forgot_password`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`,`vehicle_id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `payment_id` (`payment_id`);

--
-- Indexes for table `payment_types`
--
ALTER TABLE `payment_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `email_verification`
--
ALTER TABLE `email_verification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `forgot_password`
--
ALTER TABLE `forgot_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `payment_types`
--
ALTER TABLE `payment_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
