-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2021 at 09:52 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timesheet`
--

-- --------------------------------------------------------

--
-- Table structure for table `passes`
--

CREATE TABLE `passes` (
  `PFID` int(11) NOT NULL,
  `REF` int(11) NOT NULL,
  `DI` date NOT NULL,
  `DE` date NOT NULL,
  `SITE` varchar(1000) NOT NULL,
  `PASSIMG` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `passes`
--

INSERT INTO `passes` (`PFID`, `REF`, `DI`, `DE`, `SITE`, `PASSIMG`) VALUES
(1299, 13654, '2021-10-22', '2025-10-31', 'Site 1::Site 3', ''),
(12341, 1233, '2012-02-12', '2022-03-21', 'Site 1::Site 2', ''),
(5466, 8998, '2012-08-08', '2019-03-12', '', ''),
(3321, 212, '2022-02-02', '2022-03-03', 'Site 1::Site 3', ''),
(3321, 212, '2022-02-02', '2022-03-03', 'Site 1::Site 3', ''),
(4554, 786, '2021-05-06', '2021-09-29', 'Site 1', ''),
(32323, 21212, '2021-09-04', '2021-10-23', 'Site 1::Site 2::Site 3', ''),
(3434, 56465, '0000-00-00', '0000-00-00', 'Site 1::Site 2', '');

-- --------------------------------------------------------

--
-- Table structure for table `rfid`
--

CREATE TABLE `rfid` (
  `UID` int(11) NOT NULL,
  `Timestamp` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rfid`
--

INSERT INTO `rfid` (`UID`, `Timestamp`) VALUES
(1346170, '2021-09-12 11:55:05'),
(1872790, '2021-09-12 11:55:15'),
(121387530, '2021-09-12 11:55:24'),
(1346170, '2021-09-12 13:29:21'),
(1346170, '2021-09-12 13:29:23'),
(1346170, '2021-09-12 13:29:27'),
(1346170, '2021-09-12 13:29:57'),
(1346170, '2021-09-12 19:14:19'),
(121387530, '2021-09-12 19:14:26'),
(121387530, '2021-09-12 19:14:34'),
(1872790, '2021-09-12 19:14:42'),
(303715480, '2021-09-12 19:14:56'),
(1346170, '2021-09-12 19:15:02'),
(1346170, '2021-09-12 19:17:23');

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

CREATE TABLE `sites` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sites`
--

INSERT INTO `sites` (`id`, `name`) VALUES
(1, 'Site 123'),
(2, 'site 4533'),
(3, 'Site tes32'),
(4, 'Site 32333');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `PFID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `Role` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`PFID`, `Name`, `Password`, `Role`) VALUES
(1299, 'A K Shaji', '*53B8A1C935B3ACE7F816B672AB94FD2C237DB841', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`PFID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sites`
--
ALTER TABLE `sites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
