-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2022 at 02:04 AM
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
(12, 16, 671739, 0, '2022-02-12 11:05:37', NULL);

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
  `prepayment` decimal(18,4) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `user_id`, `vehicle_id`, `rentStartDate`, `rentEndDate`, `prepayment`, `status_id`, `createdAt`, `updatedAt`) VALUES
(2, 1, 1, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-01-02 16:28:40', NULL),
(3, 1, 2, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-02 16:35:56', NULL),
(4, 1, 3, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-02 16:36:42', NULL),
(5, 2, 1, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-02 16:38:37', NULL),
(6, 2, 2, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-02 16:38:43', NULL),
(7, 3, 2, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-01-02 16:38:50', NULL),
(8, 3, 5, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-02 23:51:12', NULL),
(9, 4, 5, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-04 00:04:29', NULL),
(11, 4, 6, '2022-01-03', '2022-01-05', '145000.0000', 3, '2022-02-04 11:43:05', NULL),
(13, 3, 5, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:39:29', NULL),
(14, 3, 5, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:39:29', NULL),
(15, 2, 5, '2022-01-10', '2022-01-11', '100000.0000', 3, '2022-02-07 04:39:29', NULL),
(16, 2, 1, '2022-01-09', '2022-01-10', '100000.0000', 2, '2022-02-07 04:39:29', NULL),
(17, 1, 1, '2022-01-10', '2022-01-11', '100000.0000', 2, '2022-02-07 04:39:29', NULL),
(18, 1, 3, '2022-01-10', '2022-01-11', '100000.0000', 2, '2022-02-07 04:39:29', NULL),
(19, 3, 5, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:39:29', NULL),
(20, 3, 5, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:39:29', NULL),
(21, 3, 5, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:39:29', NULL),
(22, 3, 5, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:39:30', NULL),
(23, 3, 5, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:39:30', NULL),
(24, 1, 4, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:40:38', NULL),
(25, 2, 5, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:40:38', NULL),
(26, 2, 4, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:40:38', NULL),
(27, 3, 5, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:40:38', NULL),
(28, 1, 5, '2022-01-10', '2022-01-11', '100000.0000', 3, '2022-02-07 04:40:38', NULL),
(29, 2, 5, '2022-01-10', '2022-01-11', '100000.0000', 3, '2022-02-07 04:40:38', NULL),
(30, 1, 5, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:41:53', NULL),
(31, 2, 3, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:41:53', NULL),
(32, 3, 1, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:41:53', NULL),
(33, 4, 6, '2022-01-03', '2022-01-05', '145000.0000', 3, '2022-02-07 04:41:53', NULL),
(34, 3, 5, '2022-01-09', '2022-01-10', '100000.0000', 3, '2022-02-07 04:41:53', NULL),
(36, 4, 6, '2022-01-03', '2022-01-05', '145000.0000', 3, '2022-02-07 04:47:25', NULL),
(38, 3, 5, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-07 05:07:57', NULL),
(44, 5, 6, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-07 22:21:05', NULL),
(45, 3, 6, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-07 22:23:47', NULL),
(46, 3, 6, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-08 13:17:08', NULL),
(47, 3, 6, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-08 13:17:33', NULL),
(48, 3, 6, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-08 13:18:54', NULL),
(49, 3, 6, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-08 13:19:08', NULL),
(50, 3, 6, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-08 13:21:38', NULL),
(51, 3, 6, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-08 13:23:44', NULL),
(52, 3, 6, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-08 13:25:36', NULL),
(53, 3, 6, '2022-01-02', '2022-01-04', '145000.0000', 1, '2022-02-08 13:33:51', NULL),
(70, 1, 6, '2022-01-02', '2022-01-09', '145000.0000', 1, '2022-02-08 14:05:48', NULL),
(74, 4, 6, '2022-01-03', '2022-01-05', '145000.0000', 3, '2022-02-10 09:06:06', NULL);

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
(5, 'Finished', '2022-02-02 15:02:41', '2022-02-02 15:05:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(80) DEFAULT NULL,
  `nickName` varchar(80) DEFAULT NULL,
  `gender` enum('Female','Male') DEFAULT NULL,
  `photo` varchar(255) NOT NULL,
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
(1, 'Adam Smith', 'Adam', 'Male', '3.jpg', 'Iskandar Street no.67 Block A Near Bus Stop', '2001-10-02', '(+62)8123456', 'adam02@gmail.com', '', '3456', 0, '2022-02-02 16:28:34', NULL),
(2, 'Bella Swanstiger', 'Bella', 'Female', '1.jpg', 'Sudirman Street no 88', '1999-09-09', '089993838383', 'bella09@gmail.com', '', '456', 0, '2022-02-02 16:34:02', '2022-02-02 16:35:18'),
(3, 'Charlie Bonstain', 'Charlie', 'Male', '3.jpg', 'Iskandar Street no.67 Block A Near Bus Stop', '2001-10-02', '(+62)8123456', 'charlie02@gmail.com', '', '123', 0, '2022-02-02 16:35:28', NULL),
(4, 'Chika Wild', 'Chika', 'Female', '3.jpg', 'Sudirman Street no.87 Block B', '2001-10-02', '(+62)898765', 'chika02@gmail.com', '', '123', 0, '2022-02-03 23:32:31', NULL),
(5, 'Bianca Waston', 'Bianca', 'Female', '3.jpg', 'Sudirman Street no.87 Block B', '1995-09-08', '(+62)898765', 'candy10@gmail.com', '', '123', 0, '2022-02-03 23:40:50', '2022-02-08 23:08:21'),
(6, 'Elma Watson', 'Elma', 'Female', '1.jpg', 'Sudirman Street no 88', '1999-09-09', '089993838383', 'elma@gmail.com', '', '$argon2i$v=19$m=4096,t=3,p=1$zQFOXCaQFHOWimIxe1asjA$pLJysy2/amTY9uLr0QYWBfbEE8XQ8YIoLsX7RRAwzYI', 0, '2022-02-10 17:12:35', '2022-02-10 17:51:41'),
(14, 'Billy Van Hotman', NULL, NULL, '', NULL, NULL, NULL, 'billy@gmail.com', 'billy_vh', '$argon2i$v=19$m=4096,t=3,p=1$6EooizMdJuJyoyujy8djIA$OzWjuLYwRR/Q4WbSrkrHoF0Kz4OfiwfedaXN59P9bIE', 1, '2022-02-11 15:27:42', '2022-02-11 15:27:42'),
(16, 'guest1', NULL, NULL, '', NULL, NULL, NULL, 'dogsegies@gmail.com', 'guest01', '$argon2i$v=19$m=4096,t=3,p=1$xuFk7wIv+MIh3yl6fdLZBg$eFCKFGaqQyVgPLvsjfaNPlT/7DRqX6Tx6aKGYQernpI', 1, '2022-02-11 23:41:58', '2022-02-12 11:05:03'),
(18, 'ajsaksjkasj', NULL, NULL, '', NULL, NULL, NULL, 'zzzzxxx@gmail.com', 'vvvvv', '$argon2i$v=19$m=4096,t=3,p=1$4bVu/sI3YREJE2VuP1RmYQ$HNVzn0nHij5zV0LISCGiiVILXbm6f2+NfWgIBUsEKeI', 1, '2022-02-12 17:37:40', '2022-02-12 17:37:40'),
(19, 'ccccc', NULL, NULL, '', NULL, NULL, NULL, 'ccc.dddd@gmail.com', 'dddd', '$argon2i$v=19$m=4096,t=3,p=1$eBkmvoe9PFRyaGaXLG0jAw$Fi4xHbSq8PAQxvOmFrT74tW03ORZ0aI71+rU3PaqmnU', 1, '2022-02-12 21:55:27', '2022-02-12 21:55:27');

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
(1, 'Toyota Avanza', 2, '1.jpg', 'Jakarta', '1000000.0000', 3, 1, '2022-01-02 15:21:12', NULL),
(2, 'Honda Beat', 3, '4.jpg', 'Jakarta', '2000000.0000', 4, 1, '2022-02-02 15:27:41', NULL),
(3, 'Honda Scoppy', 3, '3.jpg', 'Bandung', '1000000.0000', 3, 1, '2022-02-02 15:41:00', NULL),
(4, 'Honda Brio', 2, '3.jpg', 'Bandung', '1000000.0000', 3, 1, '2022-02-02 23:11:46', NULL),
(5, 'Honda BR-V', 2, '3.jpg', 'Bandung', '1000000.0000', 3, 1, '2022-02-02 23:12:02', NULL),
(6, 'Honda HRV', 2, '4.jpg', 'Jakarta', '2000000.0000', 4, 1, '2022-02-02 23:12:20', NULL),
(7, 'Toyota Alphard', 2, '1.jpg', 'Jakarta', '1000000.0000', 3, 1, '2022-02-03 11:43:23', NULL),
(8, 'Toyota Agya', 2, '1.jpg', 'Bandung', '1000000.0000', 3, 1, '2022-02-03 13:39:36', NULL),
(9, 'Toyota Calya', 2, '1.jpg', 'Bandung', '1000000.0000', 3, 1, '2022-02-03 23:18:33', NULL),
(12, 'Honda City', 2, '1.jpg', 'Medan', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(13, 'Honda Accord', 2, '1.jpg', 'Medan', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(14, 'Honda City Hatchback', 2, '1.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(15, 'Honda Civic', 2, '1.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(16, 'Honda Jazz', 2, '1.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(17, 'Honda Mobilio', 2, '1.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(18, 'Honda Odyssey', 2, '1.jpg', 'Semarang', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(19, 'Honda WR-V', 2, '1.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:03:36', NULL),
(20, 'Toyota C-HR', 2, '11.jpg', 'Jakarta', '200000.0000', 4, 1, '2022-02-05 23:08:56', NULL),
(21, 'Toyota Calya', 2, '10.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:08:56', NULL),
(22, 'Toyota Camry', 2, '8.jpg', 'Bandung', '200000.0000', 5, 1, '2022-02-05 23:08:56', NULL),
(23, 'Toyota Corolla Altis', 2, '5.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:08:56', NULL),
(24, 'Toyota Fortuner', 2, '6.jpg', 'Bandung', '100000.0000', 4, 1, '2022-02-05 23:08:57', NULL),
(25, 'Toyota HiAce', 2, '5.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:08:57', NULL),
(26, 'Honda Vario', 3, '13.jpg', 'Yogyakarta', '100000.0000', 4, 1, '2022-02-05 23:16:03', NULL),
(27, 'Honda Genio', 3, '16.jpg', 'Bali', '150000.0000', 5, 1, '2022-02-05 23:16:03', NULL),
(28, 'Yamaha XMax', 3, '15.jpg', 'Bandung', '100000.0000', 4, 1, '2022-02-05 23:16:03', NULL),
(29, 'Yamaha Fazzio', 3, '14.jpg', 'Yogyakarta', '150000.0000', 9, 1, '2022-02-05 23:16:03', NULL),
(30, 'aaaa', 1, '4.jpg', 'Kalimantan', '2000000.0000', 8, 1, '2022-02-05 23:16:03', NULL),
(31, NULL, NULL, NULL, 'Kalimantan', NULL, 5, NULL, '2022-02-05 23:25:42', NULL),
(32, NULL, NULL, NULL, 'Bali', NULL, 5, NULL, '2022-02-05 23:25:42', NULL),
(33, NULL, NULL, NULL, 'Bali', NULL, 5, NULL, '2022-02-05 23:25:42', NULL),
(34, NULL, NULL, NULL, 'Kalimantan', NULL, 5, NULL, '2022-02-05 23:25:42', NULL),
(35, NULL, NULL, NULL, 'Kalimantan', NULL, 5, NULL, '2022-02-05 23:25:42', NULL),
(36, 'Polygon', 1, 'uploads\\202010061621341000.jpg', 'Bandung', '100000.0000', 5, 1, '2022-02-09 17:07:20', NULL),
(39, 'Cannondale', 1, 'uploads\\202010061621341001.jpg', 'Bandung', '100000.0000', 5, 1, '2022-02-09 22:57:54', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
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
  ADD KEY `status_id` (`status_id`);

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
-- AUTO_INCREMENT for table `forgot_password`
--
ALTER TABLE `forgot_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

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
