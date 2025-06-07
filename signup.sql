-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2025 at 07:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `signup`
--

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `professionalTitle` varchar(100) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `alternatePhone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `technicalLanguages` text DEFAULT NULL,
  `githubLink` varchar(255) DEFAULT NULL,
  `profilePhoto` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `fullName`, `age`, `gender`, `city`, `professionalTitle`, `qualification`, `experience`, `phone`, `alternatePhone`, `email`, `technicalLanguages`, `githubLink`, `profilePhoto`, `resume`, `created_at`) VALUES
(1, 'swetha', 21, 'male', 'hyderabad', 'Marketing Specialist', 'High School Diploma', 2, '9867543210', '986665432', 'swetha@gmail.com', 'java', 'https://github.com/laxmi233', '1749267191828-148875078.jpg', '1749267191831-793501842.pdf', '2025-06-07 03:33:11'),
(2, 'priya', 23, 'female', 'hyderabad', 'Data Analyst', 'Bachelor\'s Degree', 2, '91234567888', '986665432', 'karthik@gmail.com', 'java', 'https://github.com/swetha0765', '1749267322175-997720489.jpg', '1749267322175-633309434.pdf', '2025-06-07 03:35:22'),
(3, 'laxmi', 21, 'female', 'hyderabad', 'Human Resources', 'Bachelor\'s Degree', 2, '9866124356', '9866125227', 'karthik@gmail.com', 'java,SQL,DSA', 'https://github.com/karthik233', '1749267368430-339019781.jpg', '1749267368431-624178340.pdf', '2025-06-07 03:36:08'),
(4, 'shiva', 21, 'male', 'hyderabad', 'Software Developer', 'Bachelor\'s Degree', 5, '9866124356', '986665432', 'laxmi@gmail.com', 'java,SQL,DSA', 'https://github.com/swetha0765', '1749267425185-291911187.jpg', '1749267425185-445805270.pdf', '2025-06-07 03:37:05'),
(5, 'karthik', 25, 'male', 'hyderabad', 'Sales Executive', 'Bachelor\'s Degree', 2, '9867543210', '9866125227', 'bhaskar@gmail.com', 'java,SQL,DSA', 'https://github.com/swetha0765', '1749267477730-186598550.png', '1749267477730-402855781.pdf', '2025-06-07 03:37:57'),
(6, 'bhaskar', 52, 'male', 'hyderabad', 'Human Resources', 'Master\'s Degree', 20, '9866124356', '986665432', 'swethapriya@gmail.com', 'java,SQL,DSA', 'https://github.com/swetha233', '1749267543801-317992580.jpg', '1749267543803-151820548.pdf', '2025-06-07 03:39:03'),
(7, 'devipriya', 22, 'female', 'hyderabad', 'Human Resources', 'Master\'s Degree', 1, '9866124356', '9866125227', 'swetha@gmail.com', 'java ,React', 'https://github.com/laxmi233', '1749267801368-532132745.jpg', '1749267801368-26994187.pdf', '2025-06-07 03:43:21'),
(8, 'riyanshi', 26, 'female', 'hyderabad', 'Software Developer', 'Bachelor\'s Degree', 2, '9867543210', '9866125227', 'karthik@gmail.com', 'java,SQL,DSA', 'https://github.com/swetha0765', '1749268117482-215157953.jpg', '1749268117482-532299963.pdf', '2025-06-07 03:48:37'),
(9, 'shruthika', 25, 'female', 'hyderabad', 'Human Resources', 'Bachelor\'s Degree', 3, '9866124356', '986665432', 'swetha@gmail.com', 'java ,React', 'https://github.com/laxmi233', '1749268169490-356913911.avif', '1749268169490-974421044.pdf', '2025-06-07 03:49:29'),
(10, 'varalaxmi', 21, 'female', 'hyderabad', 'Data Analyst', 'Bachelor\'s Degree', 3, '9867543210', '9866125227', 'laxmi@gmail.com', 'java,SQL,DSA', 'https://github.com/swetha233', '1749268235809-377527089.jpg', '1749268235809-658865475.pdf', '2025-06-07 03:50:35'),
(11, 'rishith', 26, 'male', 'Hyderabad', 'Software Developer', 'Master\'s Degree', 1, '91234567888', '9866125227', 'swethapriya@gmail.com', 'java,SQL,DSA', 'https://github.com/karthik233', '1749268304292-761078720.jpg', '1749268304297-323780205.pdf', '2025-06-07 03:51:44'),
(12, 'priyanka', 26, 'female', 'Hyderabad', 'Software Developer', 'Master\'s Degree', 1, '91234567888', '9866125227', 'swethapriya@gmail.com', 'java,SQL,DSA', 'https://github.com/karthik233', '1749268329221-746764682.jpg', '1749268329221-68968294.pdf', '2025-06-07 03:52:09'),
(13, 'swethapriya', 28, 'female', 'Hyderabad', 'Software Developer', 'Master\'s Degree', 1, '91234567888', '9866125227', 'swethapriya@gmail.com', 'java,SQL,DSA', 'https://github.com/karthik233', '1749268341124-636453277.jpg', '1749268341129-322697983.pdf', '2025-06-07 03:52:21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(40) NOT NULL,
  `role` enum('Employee','Employer') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'laxmi', 'swetha@gmail.com', 'Babu7472', 'Employee'),
(2, 'swethapriya11', 'swethapriya@gmail.com', 'Babu7472', 'Employer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
