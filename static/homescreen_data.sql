-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 10, 2026 at 05:22 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `godrej_traceability`
--

-- --------------------------------------------------------

--
-- Table structure for table `homescreen_data`
--
USE `godrej_traceability`;
DROP TABLE IF EXISTS `homescreen_data`;
CREATE TABLE IF NOT EXISTS `homescreen_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Anode_Mixer_Batch_ID` varchar(50) DEFAULT NULL,
  `Cathoode_Mixer_Batch_ID` varchar(50) DEFAULT NULL,
  `Cathode_Total_Cut_Count` float DEFAULT NULL,
  `Cathode_Accepted_Cut_Count` float DEFAULT NULL,
  `Cathode_Rejected_Cut_Count` float DEFAULT NULL,
  `Anode_Total_Cut_Count` float DEFAULT NULL,
  `Anode_Accepted_Cut_Count` float DEFAULT NULL,
  `Anode_Rejected_Cut_Count` float DEFAULT NULL,
  `Anode_Oven_Z1_Temp` float DEFAULT NULL,
  `Anode_Oven_Z2_Temp` float DEFAULT NULL,
  `Cathode_Oven_Z1_Temp` float DEFAULT NULL,
  `Cathode_Oven_Z2_Temp` float DEFAULT NULL,
  `Winding_Machine_Production` float DEFAULT NULL,
  `Anode_Weighing_Accepted_Count` float DEFAULT NULL,
  `Anode_Weighing_Rejected_Count` float DEFAULT NULL,
  `Cathode_Weighing_Accepted_Count` float DEFAULT NULL,
  `Cathode_Weighing_Rejected_Count` float DEFAULT NULL,
  `Tab_to_terminal_Station_Production` float DEFAULT NULL,
  `Canister_Station_Production` float DEFAULT NULL,
  `Filling_Station_Production_Qty` float DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 ;

--
-- Dumping data for table `homescreen_data`
--

INSERT INTO `homescreen_data` (`id`, `Anode_Mixer_Batch_ID`, `Cathoode_Mixer_Batch_ID`, `Cathode_Total_Cut_Count`, `Cathode_Accepted_Cut_Count`, `Cathode_Rejected_Cut_Count`, `Anode_Total_Cut_Count`, `Anode_Accepted_Cut_Count`, `Anode_Rejected_Cut_Count`, `Anode_Oven_Z1_Temp`, `Anode_Oven_Z2_Temp`, `Cathode_Oven_Z1_Temp`, `Cathode_Oven_Z2_Temp`, `Winding_Machine_Production`, `Anode_Weighing_Accepted_Count`, `Anode_Weighing_Rejected_Count`, `Cathode_Weighing_Accepted_Count`, `Cathode_Weighing_Rejected_Count`, `Tab_to_terminal_Station_Production`, `Canister_Station_Production`, `Filling_Station_Production_Qty`, `created_at`) VALUES
(1, 'AMB-74829', 'CMB-59301', 15230, 14980, 250, 14850, 14620, 230, 78.5, 80.2, 76.9, 79.1, 14200, 14550, 120, 14780, 95, 13890, 13650, 13420, '2026-05-09 12:04:17'),
(2, 'AMB-74830', 'CMB-59302', 15310, 15020, 290, 14910, 14700, 210, 79, 81.1, 77.3, 79.8, 14350, 14620, 110, 14840, 88, 13950, 13780, 13560, '2026-05-09 12:27:17'),
(3, 'AMB-74831', 'CMB-59303', 15180, 14910, 270, 14790, 14590, 200, 78.8, 80.7, 77, 79.4, 14180, 14490, 105, 14710, 92, 13760, 13590, 13380, '2026-05-09 12:27:17');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
