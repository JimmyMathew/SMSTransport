-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2019 at 07:44 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smstransport`
--

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `driverid` bigint(20) NOT NULL,
  `drivername` varchar(100) NOT NULL,
  `mobile` bigint(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `createdby` varchar(100) DEFAULT NULL,
  `createdon` datetime DEFAULT NULL,
  `updatedby` varchar(100) DEFAULT NULL,
  `updatedon` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`driverid`, `drivername`, `mobile`, `address`, `createdby`, `createdon`, `updatedby`, `updatedon`) VALUES
(1, 'Joji', 98404401351, 'Test address1', 'Admin', '2019-12-19 00:25:22', 'Admin', '2019-12-19 00:25:22'),
(3, 'Mat', 784398, 'dabjhasik', 'Admin', '2019-12-19 00:25:58', 'Admin', '2019-12-19 00:25:58');

-- --------------------------------------------------------

--
-- Table structure for table `party`
--

CREATE TABLE `party` (
  `partyid` bigint(15) NOT NULL,
  `partytype` varchar(50) NOT NULL,
  `partyname` varchar(100) NOT NULL,
  `mobile` bigint(15) DEFAULT NULL,
  `telephone` bigint(15) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `email` varchar(25) DEFAULT NULL,
  `pancard` varchar(25) DEFAULT NULL,
  `gstin` varchar(25) DEFAULT NULL,
  `createdby` varchar(15) DEFAULT NULL,
  `createdon` datetime DEFAULT NULL,
  `updatedby` varchar(15) DEFAULT NULL,
  `updatedon` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `party`
--

INSERT INTO `party` (`partyid`, `partytype`, `partyname`, `mobile`, `telephone`, `address`, `email`, `pancard`, `gstin`, `createdby`, `createdon`, `updatedby`, `updatedon`) VALUES
(1, 'testtyp', 'ji', 984044013, 12, 'testaddres', 'testemnai', 'bnv56', 'hyuy67', 'Admin', '2019-12-20 00:00:00', 'Admin', '2019-12-20 00:11:03');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `isactive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `name`, `age`, `isactive`) VALUES
(13, 'Jimmy', 27, 1),
(14, 'Mathew', 60, 1),
(15, 'Molly Mathew', 57, 1),
(16, 'Joji', 22, 1),
(17, 'Test', 21, 1);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `veicleid` bigint(20) NOT NULL,
  `vehicletype` varchar(50) NOT NULL,
  `vehicleno` varchar(50) NOT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `createdon` datetime DEFAULT NULL,
  `updatedby` varchar(50) DEFAULT NULL,
  `updatedon` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`veicleid`, `vehicletype`, `vehicleno`, `createdby`, `createdon`, `updatedby`, `updatedon`) VALUES
(1, 'Truck', 'tn05az1877', 'Admin', '2019-12-19 00:00:00', 'Admin', '2019-12-19 23:21:52'),
(3, 'Car', 'Test123', 'Admin', '2019-12-19 23:22:01', 'Admin', '2019-12-19 23:22:01'),
(4, 'Truck', 'test456', 'Admin', '2019-12-19 23:22:16', 'Admin', '2019-12-19 23:22:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`driverid`);

--
-- Indexes for table `party`
--
ALTER TABLE `party`
  ADD PRIMARY KEY (`partyid`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`veicleid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `driverid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `party`
--
ALTER TABLE `party`
  MODIFY `partyid` bigint(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `veicleid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
