-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2022 at 10:57 AM
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
(11, 4, 6, '2022-01-03', '2022-01-05', '145000.0000', 3, '2022-02-04 11:43:05', NULL);

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
  `address` varchar(80) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `mobileNumber` varchar(20) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `nickName`, `gender`, `photo`, `address`, `birthDate`, `mobileNumber`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Adam Smith', 'Adam', 'Male', '3.jpg', 'Iskandar Street no.67 Block A Near Bus Stop', '2001-10-02', '(+62)8123456', 'adam02@gmail.com', '3456', '2022-02-02 16:28:34', NULL),
(2, 'Bella Swanstiger', 'Bella', 'Female', '1.jpg', 'Sudirman Street no 88', '1999-09-09', '089993838383', 'bella09@gmail.com', '456', '2022-02-02 16:34:02', '2022-02-02 16:35:18'),
(3, 'Charlie Bonstain', 'Charlie', 'Male', '3.jpg', 'Iskandar Street no.67 Block A Near Bus Stop', '2001-10-02', '(+62)8123456', 'charlie02@gmail.com', '123', '2022-02-02 16:35:28', NULL),
(4, 'Chika Wild', 'Chika', 'Female', '3.jpg', 'Sudirman Street no.87 Block B', '2001-10-02', '(+62)898765', 'chika02@gmail.com', '123', '2022-02-03 23:32:31', NULL),
(5, 'Candy Waston', 'Candy', 'Female', '3.jpg', 'Sudirman Street no.87 Block B', '2001-10-10', '(+62)898765', 'candy10@gmail.com', '123', '2022-02-03 23:40:50', NULL);

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
  `isAvailable` tinyint(4) NOT NULL,
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
(9, 'Toyota Calya', 2, '1.jpg', 'Bandung', '1000000.0000', 3, 1, '2022-02-03 23:18:33', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
