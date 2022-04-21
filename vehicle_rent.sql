-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2022 at 11:46 PM
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
(3, 'Motorcycle', '2022-02-02 13:33:04', '2022-04-16 12:10:53');

-- --------------------------------------------------------

--
-- Table structure for table `email_verification`
--

CREATE TABLE `email_verification` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `code` varchar(20) NOT NULL,
  `isExpired` tinyint(4) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `forgot_password`
--

CREATE TABLE `forgot_password` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `code` int(11) NOT NULL,
  `isExpired` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `bookingCode` varchar(200) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `rentStartDate` date DEFAULT NULL,
  `rentEndDate` date DEFAULT NULL,
  `idCard` varchar(20) DEFAULT NULL,
  `fullname` varchar(250) DEFAULT NULL,
  `mobilePhone` varchar(20) DEFAULT NULL,
  `emailAddress` varchar(200) DEFAULT NULL,
  `location` text DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `prepayment` decimal(18,4) DEFAULT NULL,
  `paymentCode` varchar(255) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `payment_type` enum('Prepayment','Pay at end','Partial payment','') NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `bookingCode`, `user_id`, `vehicle_id`, `rentStartDate`, `rentEndDate`, `idCard`, `fullname`, `mobilePhone`, `emailAddress`, `location`, `qty`, `prepayment`, `paymentCode`, `payment_id`, `status_id`, `payment_type`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 2, 1, '2022-02-02', '2022-02-04', NULL, '', '', NULL, NULL, 4, '145000.0000', NULL, 1, 1, 'Prepayment', '2022-02-27 14:45:38', NULL),
(2, NULL, 2, 2, '2022-03-01', '2022-03-03', NULL, '', '', NULL, NULL, 4, '145000.0000', NULL, 1, 1, 'Prepayment', '2022-02-27 22:37:54', NULL),
(3, NULL, 2, 5, '2022-03-01', '2022-03-03', NULL, '', '', NULL, NULL, 4, '145000.0000', NULL, 1, 1, 'Pay at end', '2022-02-27 22:39:29', NULL),
(4, NULL, 2, 3, '2022-03-01', '2022-03-03', NULL, '', '', NULL, NULL, 4, '145000.0000', NULL, 1, 1, 'Partial payment', '2022-02-27 22:39:40', NULL),
(5, NULL, 2, 4, '2022-03-01', '2022-03-03', NULL, '', '', NULL, NULL, 4, '145000.0000', NULL, 1, 1, 'Prepayment', '2022-02-27 22:39:52', NULL),
(6, NULL, 2, 5, '2022-03-01', '2022-03-03', NULL, '', '', NULL, NULL, 4, '145000.0000', NULL, 1, 1, 'Partial payment', '2022-02-27 22:40:39', NULL),
(7, NULL, 2, 6, '2022-03-05', '2022-03-06', NULL, '', '', NULL, NULL, 4, '145000.0000', NULL, 1, 1, 'Prepayment', '2022-02-27 22:43:31', NULL),
(8, NULL, 2, 7, '2022-02-28', '2022-03-01', NULL, '', '', NULL, NULL, 4, '145000.0000', NULL, 1, 6, 'Prepayment', '2022-02-27 22:55:00', NULL),
(9, NULL, 2, 7, '2022-03-05', '2022-03-06', NULL, '', '', NULL, NULL, 4, '145000.0000', NULL, 1, 6, 'Prepayment', '2022-02-28 23:00:31', NULL),
(10, NULL, 2, 5, '2022-03-05', '2022-03-06', NULL, '', '', NULL, NULL, 4, '145000.0000', NULL, 1, 6, 'Prepayment', '2022-02-28 23:00:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `location`, `createdAt`, `updatedAt`) VALUES
(1, 'Jakarta', '2022-04-21 04:30:31', NULL),
(2, 'Bandung', '2022-04-21 04:30:31', NULL);

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
(2, 'transfer'),
(3, 'Prepayment'),
(4, 'Pay at end'),
(5, 'Partial Payment');

-- --------------------------------------------------------

--
-- Table structure for table `refresh_token`
--

CREATE TABLE `refresh_token` (
  `id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(6, 'No Prepayment', '2022-03-04 18:05:39', '2022-04-18 13:49:06');

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
  `role` enum('customer','admin') NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `nickName`, `gender`, `photo`, `address`, `birthDate`, `mobileNumber`, `email`, `username`, `password`, `isVerified`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', NULL, NULL, NULL, NULL, NULL, '081222456', 'admin@mail.com', 'admin01', '$argon2i$v=19$m=4096,t=3,p=1$3NPJsb9T9eU4nYRB4iSarg$+AStPuh/yIuSuPb3y55UE5v04iJZ+JfeyzUVr4Tq36E', 1, 'admin', '2022-04-19 16:09:50', '2022-04-19 16:10:32'),
(2, 'Adam Smith', NULL, 'Male', NULL, NULL, NULL, NULL, 'adam@mail.com', 'adam01', '$argon2i$v=19$m=4096,t=3,p=1$3NPJsb9T9eU4nYRB4iSarg$+AStPuh/yIuSuPb3y55UE5v04iJZ+JfeyzUVr4Tq36E', 1, 'customer', '2022-04-19 17:19:55', '2022-04-20 05:04:20');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `location` varchar(80) DEFAULT NULL,
  `price` decimal(18,4) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `rate` decimal(18,4) DEFAULT NULL,
  `isAvailable` tinyint(4) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `category_id`, `photo`, `description`, `location_id`, `location`, `price`, `qty`, `rate`, `isAvailable`, `createdAt`, `updatedAt`) VALUES
(1, 'Toyota Avanza', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/toyota-avanza.jpg', 'Max for 4 person', 1, NULL, '200000.0000', 3, '3.0000', 1, '2022-01-02 15:21:12', NULL),
(2, 'Toyota Camry', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/toyota-camry.jpg', 'Max for 4 person', 1, NULL, '100000.0000', 5, '3.0000', 1, '2022-02-05 23:08:56', NULL),
(3, 'Toyota Alphard', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/toyota-alphard.jpg', 'Max for 4 person', 1, NULL, '100000.0000', 3, '3.0000', 1, '2022-02-03 11:43:23', NULL),
(4, 'Toyota Agya', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/toyota-agya.jpg', 'Max for 4 person', 1, NULL, '500000.0000', 3, '3.0000', 1, '2022-02-03 13:39:36', NULL),
(5, 'Toyota Calya', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/toyota-calya.jpg', 'Max for 4 person', 1, NULL, '100000.0000', 3, '3.0000', 1, '2022-02-03 23:18:33', NULL),
(6, 'Toyota C-HR', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/Toyota-chr.jpg', 'Max for 4 person', 1, NULL, '100000.0000', 4, '3.0000', 1, '2022-02-05 23:08:56', NULL),
(7, 'Toyota Camry', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/toyota-camry.jpg', 'Max for 4 person', 1, NULL, '100000.0000', 5, '3.0000', 1, '2022-02-05 23:08:56', NULL),
(8, 'Toyota Corolla Altis', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/toyota-corolla-altis.jpg', 'Max for 4 person', 1, NULL, '100000.0000', 4, '3.0000', 1, '2022-02-05 23:08:56', NULL),
(9, 'Toyota Fortuner', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/toyota-fortuner.jpeg', 'Max for 4 person', 1, NULL, '100000.0000', 4, '3.0000', 1, '2022-02-05 23:08:57', NULL),
(10, 'Toyota HiAce', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/toyota-hiace.jpg', 'Max for 4 person', 1, NULL, '100000.0000', 4, '3.0000', 1, '2022-02-05 23:08:57', NULL),
(11, 'Honda Beat', 3, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-beat.png', 'Max for 4 person', 1, NULL, '200000.0000', 4, '3.0000', 1, '2022-02-02 15:27:41', NULL),
(12, 'Honda Scoppy', 3, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-scoppy.jpg', 'Max for 4 person', 1, NULL, '200000.0000', 3, '4.5000', 1, '2022-02-02 15:41:00', NULL),
(13, 'Honda Brio', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-brio.jpg', 'Max for 4 person', 1, NULL, '200000.0000', 3, '2.0000', 1, '2022-02-02 23:11:46', NULL),
(14, 'Honda BR-V', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/Honda-BR-V.jpg', 'Max for 4 person', 2, NULL, '200000.0000', 3, '2.5000', 1, '2022-02-02 23:12:02', NULL),
(15, 'Honda HRV', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/Honda-HRV.jpg', 'Max for 4 person', 2, NULL, '500000.0000', 4, '3.0000', 1, '2022-02-02 23:12:20', NULL),
(16, 'Honda City', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-city.jpeg', 'Max for 4 person', 2, NULL, '200000.0000', 4, '3.0000', 1, '2022-02-05 23:03:36', NULL),
(17, 'Honda Accord', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-accord.jpg', 'Max for 4 person', 2, NULL, '200000.0000', 4, '3.0000', 1, '2022-02-05 23:03:36', NULL),
(18, 'Honda Civic', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-civic.jpg', 'Max for 4 person', 2, NULL, '100000.0000', 4, '3.0000', 1, '2022-02-05 23:03:36', NULL),
(19, 'Honda Jazz', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-jazz.jpg', 'Max for 4 person', 2, NULL, '100000.0000', 4, '3.0000', 1, '2022-02-05 23:03:36', NULL),
(20, 'Honda Mobilio', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-mobilio.jpg', 'Max for 4 person', 2, NULL, '100000.0000', 4, '3.0000', 1, '2022-02-05 23:03:36', NULL),
(21, 'Honda Odyssey', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-oddysey.png', 'Max for 4 person', 2, NULL, '100000.0000', 4, '3.0000', 1, '2022-02-05 23:03:36', NULL),
(22, 'Honda WR-V', 2, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-wrv.jpg', 'Max for 4 person', 2, NULL, '100000.0000', 4, '3.0000', 1, '2022-02-05 23:03:36', NULL),
(23, 'Honda Vario', 3, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-vario.jpg', 'Max for 4 person', 2, NULL, '150000.0000', 5, '3.0000', 1, '2022-02-05 23:16:03', NULL),
(24, 'Honda Genio', 3, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/honda-genio.jpg', 'Max for 4 person', 2, NULL, '100000.0000', 5, '3.0000', 1, '2022-02-05 23:16:03', NULL),
(25, 'Yamaha XMax', 3, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/yamaha-xmax.jpg', 'Max for 4 person', 2, NULL, '150000.0000', 4, '3.0000', 1, '2022-02-05 23:16:03', NULL),
(26, 'Yamaha Fazzio', 3, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/yamaha-fazzio.jpg', 'Max for 4 person', 2, NULL, '100000.0000', 5, '3.0000', 1, '2022-02-05 23:16:03', NULL),
(27, 'Fixie', 1, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/fixie.png', 'Max for 4 person', 1, 'Yogyakarta', '100000.0000', 5, '3.0000', 1, '2022-02-23 21:18:06', NULL),
(28, 'Sport Bike', 1, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/sport-bike.png', 'Max for 4 person', 1, 'Kalimantan', '100000.0000', 5, '4.0000', 1, '2022-02-23 21:19:04', NULL),
(29, 'Onthel', 1, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/onthel.png', 'Max for 4 person', 1, 'Malang', '100000.0000', 5, '3.0000', 1, '2022-02-23 21:19:54', NULL),
(30, 'Fixie Gray', 1, 'https://res.cloudinary.com/sellavaleria19/image/upload/v1650181121/vehicle-rent/uploads/fixie-gray.png', 'Max for 4 person', 1, 'Yogyakarta', '100000.0000', 5, '3.0000', 1, '2022-02-23 21:20:29', NULL);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `forgot_password`
--
ALTER TABLE `forgot_password`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`,`vehicle_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_types`
--
ALTER TABLE `payment_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

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
  ADD KEY `category_id` (`category_id`),
  ADD KEY `location_id` (`location_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `email_verification`
--
ALTER TABLE `email_verification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `forgot_password`
--
ALTER TABLE `forgot_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_types`
--
ALTER TABLE `payment_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `refresh_token`
--
ALTER TABLE `refresh_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `email_verification`
--
ALTER TABLE `email_verification`
  ADD CONSTRAINT `email_verification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `forgot_password`
--
ALTER TABLE `forgot_password`
  ADD CONSTRAINT `forgot_password_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `payment_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD CONSTRAINT `refresh_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
