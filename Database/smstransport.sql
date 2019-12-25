-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2019 at 09:56 AM
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
-- Table structure for table `dailyexpenses`
--

CREATE TABLE `dailyexpenses` (
  `id` bigint(20) NOT NULL,
  `date` text DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `vehicletype` varchar(50) DEFAULT NULL,
  `vehicleno` varchar(50) DEFAULT NULL,
  `driverbata` float DEFAULT NULL,
  `toll` float DEFAULT NULL,
  `pass` float DEFAULT NULL,
  `fuelrate` float DEFAULT NULL,
  `fuellitre` float DEFAULT NULL,
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dailyexpenses`
--

INSERT INTO `dailyexpenses` (`id`, `date`, `name`, `vehicletype`, `vehicleno`, `driverbata`, `toll`, `pass`, `fuelrate`, `fuellitre`, `total`) VALUES
(1, '2019-12-20', 'test', 'Truck', 'tn05al123', 34, 243, 432, 43, 43, 34),
(4, 'fds', 'fd', 'Car', 'fds', 5, 54, 54, 54, 5, 4),
(6, '54', '543', 'Car', 'Test123', 543, 3, 432, 232, 32, 23),
(7, '21/12/2019 16:22', 'vfgd', 'Car', 'TN10AZ1877', 10, 10, 10, 2, 10, 50),
(8, '21/12/2019 16:33', 'test', 'Truck', 'TN08BL1234', 123.78, 487.89, 88.56, 89767, 789.345, 70857800),
(9, '23/12/2019 11:42', '', 'Car', 'TN10AZ1877', 1.15, 1.15, 2.25, 1.5, 2.75, 8.675);

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
-- Table structure for table `mechanicexpenses`
--

CREATE TABLE `mechanicexpenses` (
  `id` bigint(20) NOT NULL,
  `date` text NOT NULL,
  `vehicletype` varchar(100) NOT NULL,
  `vehicleno` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `mechaniclobor` float NOT NULL,
  `electriclabor` float NOT NULL,
  `bodywork` int(11) NOT NULL,
  `oilchange` float NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mechanicexpenses`
--

INSERT INTO `mechanicexpenses` (`id`, `date`, `vehicletype`, `vehicleno`, `description`, `mechaniclobor`, `electriclabor`, `bodywork`, `oilchange`, `total`) VALUES
(1, '23/12/2019 14:30', 'Car', 'TN10AZ1877', 'Test1', 10, 10, 10, 5, 35),
(3, '23/12/2019 14:32', 'Car', 'TN10AZ1877', 'new', 89, 89, 89, 98, 365);

-- --------------------------------------------------------

--
-- Table structure for table `miscexpenses`
--

CREATE TABLE `miscexpenses` (
  `id` bigint(20) NOT NULL,
  `date` text NOT NULL,
  `vehicletype` varchar(100) NOT NULL,
  `vehicleno` varchar(100) NOT NULL,
  `pc` float NOT NULL,
  `rdo` float NOT NULL,
  `rto` float NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `miscexpenses`
--

INSERT INTO `miscexpenses` (`id`, `date`, `vehicletype`, `vehicleno`, `pc`, `rdo`, `rto`, `total`) VALUES
(2, '23/12/2019 15:10', 'Truck', 'TN08BL1234', 20, 20, 20, 60);

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
-- Table structure for table `rtoexpenses`
--

CREATE TABLE `rtoexpenses` (
  `id` bigint(20) NOT NULL,
  `date` text NOT NULL,
  `vehicletype` varchar(100) NOT NULL,
  `vehicleno` varchar(100) NOT NULL,
  `tax` float NOT NULL,
  `insurance` float NOT NULL,
  `fc` float NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rtoexpenses`
--

INSERT INTO `rtoexpenses` (`id`, `date`, `vehicletype`, `vehicleno`, `tax`, `insurance`, `fc`, `total`) VALUES
(1, '23/12/2019 12:28', 'Truck', 'TN05AL3362', 100, 100, 100, 300),
(2, '23/12/2019 12:29', 'Car', 'TN10AZ1877', 10, 10, 10, 30);

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` bigint(20) NOT NULL,
  `date` text NOT NULL,
  `vehicletype` varchar(100) NOT NULL,
  `vehicleno` varchar(100) NOT NULL,
  `driver` varchar(100) NOT NULL,
  `mode` varchar(100) NOT NULL,
  `party` varchar(100) NOT NULL,
  `rentdetail` varchar(100) NOT NULL,
  `loadfrom` varchar(100) NOT NULL,
  `loadto` varchar(100) NOT NULL,
  `ratetype` varchar(100) NOT NULL,
  `rate` float NOT NULL,
  `ton` float NOT NULL,
  `startingkm` float NOT NULL,
  `closingkm` float NOT NULL,
  `expensekm` float NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Table structure for table `tiredetails`
--

CREATE TABLE `tiredetails` (
  `id` bigint(20) NOT NULL,
  `date` text NOT NULL,
  `vehicletype` varchar(100) NOT NULL,
  `vehicleno` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `side` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `startkm` float NOT NULL,
  `closekm` float NOT NULL,
  `starthour` float NOT NULL,
  `closehour` float NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tiredetails`
--

INSERT INTO `tiredetails` (`id`, `date`, `vehicletype`, `vehicleno`, `type`, `side`, `company`, `startkm`, `closekm`, `starthour`, `closehour`, `total`) VALUES
(1, '24/12/2019 13:16', 'Car', 'TN10AZ1877', 'Original', 'Front', 'testCopany', 1, 2, 3, 4, 5);

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
(5, 'Truck', 'TN05AL3362', 'Admin', '2019-12-21 00:00:00', 'Admin', '2019-12-21 00:00:00'),
(6, 'Car', 'TN10AZ1877', 'Admin', '2019-12-21 00:00:00', 'Admin', '2019-12-21 00:00:00'),
(7, 'Truck', 'TN08BL1234', 'Admin', '2019-12-21 00:00:00', 'Admin', '2019-12-21 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dailyexpenses`
--
ALTER TABLE `dailyexpenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`driverid`);

--
-- Indexes for table `mechanicexpenses`
--
ALTER TABLE `mechanicexpenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `miscexpenses`
--
ALTER TABLE `miscexpenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `party`
--
ALTER TABLE `party`
  ADD PRIMARY KEY (`partyid`);

--
-- Indexes for table `rtoexpenses`
--
ALTER TABLE `rtoexpenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tiredetails`
--
ALTER TABLE `tiredetails`
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
-- AUTO_INCREMENT for table `dailyexpenses`
--
ALTER TABLE `dailyexpenses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `driverid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `mechanicexpenses`
--
ALTER TABLE `mechanicexpenses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `miscexpenses`
--
ALTER TABLE `miscexpenses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `party`
--
ALTER TABLE `party`
  MODIFY `partyid` bigint(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rtoexpenses`
--
ALTER TABLE `rtoexpenses`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tiredetails`
--
ALTER TABLE `tiredetails`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `veicleid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
