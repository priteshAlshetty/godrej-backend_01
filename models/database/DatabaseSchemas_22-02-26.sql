-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2026 at 12:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
CREATE DATABASE IF NOT EXISTS `godrej_traceability` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `godrej_traceability`;

-- --------------------------------------------------------

--
-- Table structure for table `batch_electrode_mapping`
--

CREATE TABLE `batch_electrode_mapping` (
  `batch_id` varchar(50) NOT NULL,
  `electrode_id` varchar(50) NOT NULL,
  `electrode_type` varchar(10) NOT NULL DEFAULT 'ANODE',
  `date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `batch_electrode_mapping`
--

INSERT INTO `batch_electrode_mapping` (`batch_id`, `electrode_id`, `electrode_type`, `date_time`) VALUES
('AB 05-02-2026 1', 'AE 05-02-2026 01', 'Anode', '2026-02-20 14:18:13'),
('AB 05-02-2026 1', 'AE 05-02-2026 02', 'Anode', '2026-02-20 14:18:13'),
('AB 05-02-2026 2', 'AE 05-02-2026 03', 'Anode', '2026-02-20 14:18:13'),
('AB 05-02-2026 3', 'AE 05-02-2026 04', 'Anode', '2026-02-20 14:18:13'),
('AB 05-02-2026 4', 'AE 05-02-2026 05', 'Anode', '2026-02-20 14:18:13'),
('AB 12-02-2026 1', 'AE 12-02-2026 01', 'Anode', '2026-02-20 14:18:13'),
('AB 12-02-2026 1', 'AE 12-02-2026 02', 'Anode', '2026-02-20 14:18:13'),
('AB 12-02-2026 2', 'AE 12-02-2026 03', 'Anode', '2026-02-20 14:18:13'),
('AB 12-02-2026 3', 'AE 12-02-2026 04', 'Anode', '2026-02-20 14:18:13'),
('AB 12-02-2026 4', 'AE 12-02-2026 05', 'Anode', '2026-02-20 14:18:13'),
('AB 20-02-2026 1', 'AE 20-02-2026 01', 'Anode', '2026-02-20 14:18:13'),
('AB 20-02-2026 1', 'AE 20-02-2026 02', 'Anode', '2026-02-20 14:18:13'),
('AB 20-02-2026 2', 'AE 20-02-2026 03', 'Anode', '2026-02-20 14:18:13'),
('AB 20-02-2026 3', 'AE 20-02-2026 04', 'Anode', '2026-02-20 14:18:13'),
('AB 20-02-2026 4', 'AE 20-02-2026 05', 'Anode', '2026-02-20 14:18:13'),
('AB 22-02-2026  10', 'AE 22-02-2026 10', 'ANODE', '2026-02-22 12:13:58'),
('AB 22-02-2026  10', 'AE 22-02-2026 undefined', 'ANODE', '2026-02-22 12:21:58'),
('CB 05-02-2026 1', 'CE 05-02-2026 01', 'Cathode', '2026-02-20 14:18:13'),
('CB 05-02-2026 1', 'CE 05-02-2026 02', 'Cathode', '2026-02-20 14:18:13'),
('CB 05-02-2026 2', 'CE 05-02-2026 03', 'Cathode', '2026-02-20 14:18:13'),
('CB 05-02-2026 3', 'CE 05-02-2026 04', 'Cathode', '2026-02-20 14:18:13'),
('CB 05-02-2026 4', 'CE 05-02-2026 05', 'Cathode', '2026-02-20 14:18:13'),
('CB 12-02-2026 1', 'CE 12-02-2026 01', 'Cathode', '2026-02-20 14:18:13'),
('CB 12-02-2026 1', 'CE 12-02-2026 02', 'Cathode', '2026-02-20 14:18:13'),
('CB 12-02-2026 2', 'CE 12-02-2026 03', 'Cathode', '2026-02-20 14:18:13'),
('CB 12-02-2026 3', 'CE 12-02-2026 04', 'Cathode', '2026-02-20 14:18:13'),
('CB 12-02-2026 4', 'CE 12-02-2026 05', 'Cathode', '2026-02-20 14:18:13'),
('CB 20-02-2026 1', 'CE 20-02-2026 01', 'Cathode', '2026-02-20 14:18:13'),
('CB 20-02-2026 1', 'CE 20-02-2026 02', 'Cathode', '2026-02-20 14:18:13'),
('CB 20-02-2026 2', 'CE 20-02-2026 03', 'Cathode', '2026-02-20 14:18:13'),
('CB 20-02-2026 3', 'CE 20-02-2026 04', 'Cathode', '2026-02-20 14:18:13'),
('CB 20-02-2026 4', 'CE 20-02-2026 05', 'Cathode', '2026-02-20 14:18:13'),
('CB 22-02-2026  10', 'CE 22-02-2026 10', 'CATHODE', '2026-02-22 12:13:32');

-- --------------------------------------------------------

--
-- Table structure for table `batch_main`
--

CREATE TABLE `batch_main` (
  `batch_id` varchar(50) NOT NULL,
  `start_timestamp` timestamp NULL DEFAULT NULL,
  `stop_timestamp` timestamp NULL DEFAULT NULL,
  `mixing_time` float DEFAULT NULL,
  `ambient_temp` float DEFAULT NULL,
  `Humidity` float DEFAULT NULL,
  `final_paste_temp` float DEFAULT NULL,
  `max_current` float DEFAULT NULL,
  `max_torque` float DEFAULT NULL,
  `recipe_id` varchar(50) DEFAULT NULL,
  `batch_size` int(11) DEFAULT NULL,
  `paste_moisture` float DEFAULT NULL,
  `paste_density` float DEFAULT NULL,
  `water` float DEFAULT NULL,
  `teflon` float DEFAULT NULL,
  `zinc_emd` float DEFAULT NULL,
  `graphite_indium` float DEFAULT NULL,
  `bismuth` float DEFAULT NULL,
  `laponite` float DEFAULT NULL,
  `penetration` float DEFAULT NULL,
  `BNB90` float DEFAULT NULL,
  `MX25` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `batch_main`
--

INSERT INTO `batch_main` (`batch_id`, `start_timestamp`, `stop_timestamp`, `mixing_time`, `ambient_temp`, `Humidity`, `final_paste_temp`, `max_current`, `max_torque`, `recipe_id`, `batch_size`, `paste_moisture`, `paste_density`, `water`, `teflon`, `zinc_emd`, `graphite_indium`, `bismuth`, `laponite`, `penetration`, `BNB90`, `MX25`) VALUES
('AB 03-02-2026  1', '2026-02-03 02:30:00', '2026-02-03 03:30:00', 60, 28.5, 55, 42, 120, 80, 'RCP-A1', 500, 1.25, 2.7, 15, 2, 5, 3, 1, 0.5, 12, 4, 2),
('AB 03-02-2026  2', '2026-02-03 03:45:00', '2026-02-03 04:40:00', 55, 29, 54, 43, 118, 82, 'RCP-A1', 500, 1.27, 2.75, 14, 2, 5, 3, 1, 0.6, 11, 4, 2),
('AB 03-02-2026  3', '2026-02-03 05:00:00', '2026-02-03 05:55:00', 55, 28, 56, 41, 122, 79, 'RCP-A2', 520, 1.3, 2.78, 16, 2, 6, 3, 1, 0.5, 13, 5, 3),
('AB 03-02-2026  4', '2026-02-03 06:10:00', '2026-02-03 07:10:00', 60, 28.2, 55, 42, 121, 81, 'RCP-A2', 520, 1.28, 2.76, 15, 2, 6, 3, 1, 0.6, 12, 5, 3),
('AB 08-02-2026  1', '2026-02-08 02:30:00', '2026-02-08 03:30:00', 60, 28, 55, 43, 119, 83, 'RCP-A3', 510, 1.26, 2.77, 15, 2, 6, 3, 1, 0.5, 12, 5, 3),
('AB 08-02-2026  2', '2026-02-08 03:50:00', '2026-02-08 04:45:00', 55, 29, 54, 42, 118, 80, 'RCP-A3', 510, 1.29, 2.79, 16, 2, 6, 3, 1, 0.6, 11, 5, 3),
('AB 08-02-2026  3', '2026-02-08 05:00:00', '2026-02-08 05:55:00', 55, 28.9, 54, 43, 121, 84, 'RCP-A4', 530, 1.31, 2.81, 15, 2, 7, 3, 1, 0.5, 13, 6, 4),
('AB 08-02-2026  4', '2026-02-08 06:15:00', '2026-02-08 07:10:00', 55, 29.2, 53, 43, 122, 82, 'RCP-A4', 530, 1.3, 2.83, 16, 2, 7, 3, 1, 0.6, 12, 6, 4),
('AB 14-02-2026  1', '2026-02-14 02:30:00', '2026-02-14 03:30:00', 60, 28, 55, 42, 120, 82, 'RCP-A5', 515, 1.27, 2.8, 15, 2, 6, 3, 1, 0.5, 12, 5, 3),
('AB 14-02-2026  2', '2026-02-14 03:45:00', '2026-02-14 04:40:00', 55, 28.8, 55, 43, 119, 83, 'RCP-A5', 515, 1.28, 2.82, 16, 2, 6, 3, 1, 0.6, 13, 6, 4),
('AB 14-02-2026  3', '2026-02-14 05:00:00', '2026-02-14 05:55:00', 55, 29, 54, 44, 121, 85, 'RCP-A6', 540, 1.32, 2.85, 17, 2, 7, 3, 1, 0.5, 14, 6, 4),
('AB 14-02-2026  4', '2026-02-14 06:15:00', '2026-02-14 07:10:00', 55, 28.7, 54, 43, 122, 84, 'RCP-A6', 540, 1.3, 2.84, 16, 2, 7, 3, 1, 0.6, 13, 6, 4),
('AB 20-02-2026  1', '2026-02-20 02:30:00', '2026-02-20 03:30:00', 60, 28.4, 55, 43, 120, 83, 'RCP-A7', 550, 1.33, 2.88, 18, 2, 8, 3, 1, 0.5, 14, 6, 4),
('AB 20-02-2026  2', '2026-02-20 03:45:00', '2026-02-20 04:40:00', 55, 29, 54, 44, 121, 85, 'RCP-A7', 550, 1.34, 2.9, 19, 2, 8, 3, 1, 0.6, 15, 7, 5),
('AB 20-02-2026  3', '2026-02-20 05:00:00', '2026-02-20 05:55:00', 55, 28.9, 55, 45, 122, 86, 'RCP-A8', 560, 1.35, 2.92, 20, 2, 8, 3, 1, 0.5, 16, 7, 5),
('AB 20-02-2026  4', '2026-02-20 06:15:00', '2026-02-20 07:10:00', 55, 29.1, 54, 44, 123, 87, 'RCP-A8', 560, 1.36, 2.94, 21, 2, 9, 3, 1, 0.6, 17, 7, 5),
('AB 22-02-2026  10', '2026-02-22 04:27:48', '2026-02-22 04:37:22', 1.222, 122, 133, 44.46, 16.22, 120.89, NULL, NULL, 75.9, 44.465, 333.454, 333.454, 123.78, 44.46, 23.465, 4.4, 11.23, 12.465, NULL),
('CB 03-02-2026  1', '2026-02-03 02:40:00', '2026-02-03 03:35:00', 55, 27.5, 52, 45, 130, 85, 'RCP-C1', 600, 0.95, 3.1, 18, 3, 7, 4, 2, 0.7, 14, 6, 4),
('CB 03-02-2026  2', '2026-02-03 03:50:00', '2026-02-03 04:45:00', 55, 28, 51, 44, 132, 87, 'RCP-C1', 600, 0.98, 3.15, 17, 3, 7, 4, 2, 0.6, 15, 6, 4),
('CB 03-02-2026  3', '2026-02-03 05:05:00', '2026-02-03 06:00:00', 55, 27.8, 53, 45, 131, 86, 'RCP-C2', 620, 0.97, 3.18, 19, 3, 8, 4, 2, 0.7, 14, 7, 5),
('CB 03-02-2026  4', '2026-02-03 06:20:00', '2026-02-03 07:15:00', 55, 28.3, 52, 45, 133, 88, 'RCP-C2', 620, 0.99, 3.2, 18, 3, 8, 4, 2, 0.6, 15, 7, 5),
('CB 08-02-2026  1', '2026-02-08 02:45:00', '2026-02-08 03:40:00', 55, 27.6, 52, 46, 134, 89, 'RCP-C3', 610, 0.96, 3.22, 18, 3, 8, 4, 2, 0.7, 14, 7, 5),
('CB 08-02-2026  2', '2026-02-08 04:00:00', '2026-02-08 04:55:00', 55, 27.9, 53, 46, 135, 90, 'RCP-C3', 610, 0.95, 3.25, 19, 3, 8, 4, 2, 0.6, 15, 7, 5),
('CB 08-02-2026  3', '2026-02-08 05:15:00', '2026-02-08 06:10:00', 55, 28.1, 52, 45, 133, 88, 'RCP-C4', 630, 0.97, 3.28, 20, 3, 9, 4, 2, 0.7, 16, 8, 6),
('CB 08-02-2026  4', '2026-02-08 06:30:00', '2026-02-08 07:25:00', 55, 28.4, 51, 46, 136, 91, 'RCP-C4', 630, 0.98, 3.3, 19, 3, 9, 4, 2, 0.6, 15, 8, 6),
('CB 14-02-2026  1', '2026-02-14 02:50:00', '2026-02-14 03:45:00', 55, 27.7, 52, 45, 132, 87, 'RCP-C5', 620, 0.96, 3.24, 18, 3, 8, 4, 2, 0.7, 14, 7, 5),
('CB 14-02-2026  2', '2026-02-14 04:05:00', '2026-02-14 05:00:00', 55, 28, 53, 46, 134, 89, 'RCP-C5', 620, 0.97, 3.27, 19, 3, 8, 4, 2, 0.6, 15, 7, 5),
('CB 14-02-2026  3', '2026-02-14 05:20:00', '2026-02-14 06:15:00', 55, 28.2, 52, 47, 137, 92, 'RCP-C6', 640, 0.99, 3.32, 20, 3, 9, 4, 2, 0.7, 16, 8, 6),
('CB 14-02-2026  4', '2026-02-14 06:35:00', '2026-02-14 07:30:00', 55, 28.5, 51, 46, 138, 93, 'RCP-C6', 640, 1, 3.35, 21, 3, 9, 4, 2, 0.6, 17, 8, 6),
('CB 20-02-2026  1', '2026-02-20 02:50:00', '2026-02-20 03:45:00', 55, 27.8, 52, 46, 135, 90, 'RCP-C7', 650, 1.02, 3.38, 22, 3, 9, 4, 2, 0.7, 18, 9, 6),
('CB 20-02-2026  2', '2026-02-20 04:05:00', '2026-02-20 05:00:00', 55, 28, 53, 47, 136, 91, 'RCP-C7', 650, 1.03, 3.4, 23, 3, 9, 4, 2, 0.6, 19, 9, 6),
('CB 20-02-2026  3', '2026-02-20 05:20:00', '2026-02-20 06:15:00', 55, 28.3, 52, 48, 137, 92, 'RCP-C8', 660, 1.04, 3.42, 24, 3, 10, 4, 2, 0.7, 20, 9, 6),
('CB 20-02-2026  4', '2026-02-20 06:35:00', '2026-02-20 07:30:00', 55, 28.6, 51, 47, 138, 93, 'RCP-C8', 660, 1.05, 3.45, 25, 3, 10, 4, 2, 0.6, 21, 9, 6),
('CB 22-02-2026  10', '2026-02-22 05:03:47', '2026-02-22 05:30:09', 67.787, 144, 155, 34.78, 787.809, 345.78, NULL, 24, 46.89, 22.6, 333.454, 333.454, 123.78, NULL, 78.89, NULL, 67.7, 123.78, 123.78);

-- --------------------------------------------------------

--
-- Table structure for table `battery_cell_mapping`
--

CREATE TABLE `battery_cell_mapping` (
  `battery_id` varchar(50) NOT NULL,
  `cell_id_1` varchar(50) DEFAULT NULL,
  `cell_id_2` varchar(50) DEFAULT NULL,
  `cell_id_3` varchar(50) DEFAULT NULL,
  `cell_id_4` varchar(50) DEFAULT NULL,
  `cell_id_5` varchar(50) DEFAULT NULL,
  `cell_id_6` varchar(50) DEFAULT NULL,
  `cell_id_7` varchar(50) DEFAULT NULL,
  `cell_id_8` varchar(50) DEFAULT NULL,
  `cell_id_9` varchar(50) DEFAULT NULL,
  `cell_id_10` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `battery_cell_mapping`
--

INSERT INTO `battery_cell_mapping` (`battery_id`, `cell_id_1`, `cell_id_2`, `cell_id_3`, `cell_id_4`, `cell_id_5`, `cell_id_6`, `cell_id_7`, `cell_id_8`, `cell_id_9`, `cell_id_10`) VALUES
('BATT-2026-001', 'C847362A-001', 'C583920B-002', 'C194735C-003', 'C762914D-004', 'C315847E-005', 'C928374F-006', 'C483920G-007', 'C756281H-008', 'C192837I-009', 'C564738J-010'),
('BATT-2026-0012', 'C918374T-0201', 'C918374T-0202', 'C918374T-0203', 'C918374T-0204', 'C918374T-0205', 'C918374T-0206', 'C918374T-0207', 'C918374T-0208', 'C918374T-0209', 'C918374T-02010'),
('BATT-2026-002', 'C847291K-011', 'C374829L-012', 'C918273M-013', 'C546372N-014', 'C837261O-015', 'C192746P-016', 'C564839Q-017', 'C837462R-018', 'C273849S-019', 'C918374T-020');

-- --------------------------------------------------------

--
-- Table structure for table `battery_main`
--

CREATE TABLE `battery_main` (
  `battery_id` varchar(50) NOT NULL,
  `battery_ocv` varchar(50) DEFAULT NULL,
  `Date_Time` timestamp NOT NULL DEFAULT current_timestamp(),
  `manufactured_timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `battery_main`
--

INSERT INTO `battery_main` (`battery_id`, `battery_ocv`, `Date_Time`, `manufactured_timestamp`) VALUES
('BATT-2026-001', '36.72', '2026-02-06 08:30:00', '2026-02-06 13:30:00'),
('BATT-2026-0012', NULL, '2026-02-22 08:09:45', '2026-02-22 13:39:45'),
('BATT-2026-002', '36.85', '2026-02-21 10:00:00', '2026-02-21 15:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cathode`
--

CREATE TABLE `cathode` (
  `electrode_id` varchar(50) NOT NULL,
  `weight` float NOT NULL,
  `moisture` varchar(50) NOT NULL,
  `thickness` float NOT NULL,
  `density` float NOT NULL,
  `IR_temp_1` float NOT NULL,
  `IR_temp_2` float NOT NULL,
  `chain_speed` float NOT NULL,
  `zone_temp_1` float NOT NULL,
  `zone_temp_2` float NOT NULL,
  `humidity` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cell_electrode_mapping`
--

CREATE TABLE `cell_electrode_mapping` (
  `cell_id` varchar(50) NOT NULL,
  `anode_id` varchar(50) NOT NULL,
  `cathode_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cell_electrode_mapping`
--

INSERT INTO `cell_electrode_mapping` (`cell_id`, `anode_id`, `cathode_id`) VALUES
('C192746P-016', 'AE 05-02-2026 01', 'CE 05-02-2026 01'),
('C192837I-009', 'AE 12-02-2026 04', 'CE 12-02-2026 04'),
('C194735C-003', 'AE 05-02-2026 03', 'CE 05-02-2026 03'),
('C273849S-019', 'AE 05-02-2026 02', 'CE 05-02-2026 02'),
('C315847E-005', 'AE 05-02-2026 05', 'CE 05-02-2026 05'),
('C374829L-012', 'AE 20-02-2026 02', 'CE 20-02-2026 02'),
('C483920G-007', 'AE 12-02-2026 02', 'CE 12-02-2026 02'),
('C546372N-014', 'AE 20-02-2026 04', 'CE 20-02-2026 04'),
('C564738J-010', 'AE 12-02-2026 05', 'CE 12-02-2026 05'),
('C564839Q-017', 'AE 12-02-2026 01', 'CE 12-02-2026 01'),
('C583920B-002', 'AE 05-02-2026 02', 'CE 05-02-2026 02'),
('C756281H-008', 'AE 12-02-2026 03', 'CE 12-02-2026 03'),
('C762914D-004', 'AE 05-02-2026 04', 'CE 05-02-2026 04'),
('C837261O-015', 'AE 20-02-2026 05', 'CE 20-02-2026 05'),
('C837462R-018', 'AE 20-02-2026 01', 'CE 20-02-2026 01'),
('C847291K-011', 'AE 20-02-2026 01', 'CE 20-02-2026 01'),
('C847362A-001', 'AE 05-02-2026 01', 'CE 05-02-2026 01'),
('C918273M-013', 'AE 20-02-2026 03', 'CE 20-02-2026 03'),
('C918374T-020', 'AE 12-02-2026 02', 'CE 12-02-2026 02'),
('C918374T-02010', 'AE 22-02-2026 10', 'CE 22-02-2026 10'),
('C918374T-02020', 'AE 22-02-2026 undefined', 'CE 22-02-2026 undefined'),
('C928374F-006', 'AE 12-02-2026 01', 'CE 12-02-2026 01');

-- --------------------------------------------------------

--
-- Table structure for table `cell_main`
--

CREATE TABLE `cell_main` (
  `cell_id` varchar(50) NOT NULL,
  `cell_ocv` float DEFAULT NULL,
  `cell_ir` float DEFAULT NULL,
  `cell_hrd` float DEFAULT NULL,
  `filling_datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `dry_weight` float DEFAULT NULL,
  `filled_weight` float DEFAULT NULL,
  `jelly_roll_wt` varchar(80) DEFAULT NULL,
  `jelly_roll_dia` float DEFAULT NULL,
  `testing_timestamp` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cell_main`
--

INSERT INTO `cell_main` (`cell_id`, `cell_ocv`, `cell_ir`, `cell_hrd`, `filling_datetime`, `dry_weight`, `filled_weight`, `jelly_roll_wt`, `jelly_roll_dia`, `testing_timestamp`) VALUES
('C192746P-016', 3.65, 12.3, 98, '2026-02-28 09:15:00', 45, 48.5, '30.3', 18.3, '2026-02-28 10:45:00'),
('C192837I-009', 3.67, 11.6, 98.3, '2026-02-12 10:45:00', 45.3, 48.8, '30.6', 18.5, '2026-02-12 12:15:00'),
('C194735C-003', 3.64, 12.2, 98.5, '2026-02-05 10:30:00', 45.3, 48.8, '30.6', 18.5, '2026-02-05 12:00:00'),
('C273849S-019', 3.66, 12, 98.4, '2026-02-28 10:45:00', 45.2, 48.7, '30.5', 18.5, '2026-02-28 12:15:00'),
('C315847E-005', 3.68, 12, 98.7, '2026-02-05 11:30:00', 45.4, 48.9, '30.7', 18.6, '2026-02-05 13:00:00'),
('C374829L-012', 3.62, 12.6, 97.7, '2026-02-20 09:30:00', 44.9, 48.3, '30.1', 18.2, '2026-02-20 11:00:00'),
('C483920G-007', 3.69, 11.7, 98.6, '2026-02-12 09:45:00', 45.5, 49, '30.8', 18.7, '2026-02-12 11:15:00'),
('C546372N-014', 3.64, 12.2, 98.1, '2026-02-20 10:30:00', 45.2, 48.6, '30.4', 18.4, '2026-02-20 12:00:00'),
('C564738J-010', 3.66, 12.1, 98.4, '2026-02-12 11:15:00', 45.1, 48.7, '30.5', 18.4, '2026-02-12 12:45:00'),
('C564839Q-017', 3.69, 11.7, 98.7, '2026-02-28 09:45:00', 45.5, 49, '30.8', 18.7, '2026-02-28 11:15:00'),
('C583920B-002', 3.67, 11.8, 97.9, '2026-02-05 10:00:00', 45, 48.6, '30.4', 18.3, '2026-02-05 11:30:00'),
('C756281H-008', 3.65, 12.3, 98, '2026-02-12 10:15:00', 45.2, 48.6, '30.4', 18.4, '2026-02-12 11:45:00'),
('C762914D-004', 3.66, 11.9, 98.1, '2026-02-05 11:00:00', 45.1, 48.5, '30.3', 18.4, '2026-02-05 12:30:00'),
('C837261O-015', 3.67, 11.8, 98.3, '2026-02-20 11:00:00', 45.3, 48.7, '30.5', 18.5, '2026-02-20 12:30:00'),
('C837462R-018', 3.63, 12.4, 97.9, '2026-02-28 10:15:00', 45.1, 48.6, '30.4', 18.4, '2026-02-28 11:45:00'),
('C847291K-011', 3.7, 11.5, 98.8, '2026-02-20 09:00:00', 45.6, 49.1, '30.9', 18.8, '2026-02-20 10:30:00'),
('C847362A-001', 3.65, 12.5, 98.2, '2026-02-05 09:30:00', 45.2, 48.7, '30.5', 18.4, '2026-02-05 11:00:00'),
('C918273M-013', 3.68, 11.9, 98.6, '2026-02-20 10:00:00', 45.4, 48.9, '30.7', 18.6, '2026-02-20 11:30:00'),
('C918374T-020', 3.68, 11.6, 98.6, '2026-02-28 11:15:00', 45.4, 48.9, '30.7', 18.6, '2026-02-28 12:45:00'),
('C918374T-02010', NULL, NULL, NULL, '2026-02-22 12:49:36', 100.1, 200.2, '22', 0.033, NULL),
('C918374T-02020', NULL, NULL, NULL, '2026-02-22 13:59:48', 100.1, 200.2, '222', 0.333, NULL),
('C928374F-006', 3.63, 12.4, 97.8, '2026-02-12 09:15:00', 45, 48.4, '30.2', 18.3, '2026-02-12 10:45:00');

-- --------------------------------------------------------

--
-- Table structure for table `electrode`
--

CREATE TABLE `electrode` (
  `electrode_id` varchar(50) NOT NULL,
  `product_count` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT 0,
  `weight` float DEFAULT NULL,
  `moisture` float DEFAULT NULL,
  `thickness` float DEFAULT NULL,
  `density` float DEFAULT NULL,
  `IR_temp_1` float DEFAULT NULL,
  `IR_temp_2` float DEFAULT NULL,
  `IR_temp_3` float DEFAULT NULL,
  `chain_speed` float DEFAULT NULL,
  `zone_temp_1` float DEFAULT NULL,
  `zone_temp_2` float DEFAULT NULL,
  `zone_temp_3` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `electrode_type` varchar(50) DEFAULT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='stores data related to electrode';

--
-- Dumping data for table `electrode`
--

INSERT INTO `electrode` (`electrode_id`, `product_count`, `status`, `weight`, `moisture`, `thickness`, `density`, `IR_temp_1`, `IR_temp_2`, `IR_temp_3`, `chain_speed`, `zone_temp_1`, `zone_temp_2`, `zone_temp_3`, `humidity`, `electrode_type`, `date_time`) VALUES
('AE 05-02-2026 01', 10, 0, 45.2, 0.8, 0.15, 2.3, 60, 61, 59, 1.5, 80, 82, 81, 45, 'Anode', '2026-02-05 08:10:00'),
('AE 05-02-2026 02', 12, 0, 44.9, 0.7, 0.14, 2.2, 61, 60, 62, 1.6, 79, 81, 80, 44, 'Anode', '2026-02-05 09:00:00'),
('AE 05-02-2026 03', 8, 0, 46.1, 0.9, 0.16, 2.4, 62, 63, 61, 1.4, 83, 84, 82, 46, 'Anode', '2026-02-05 10:00:00'),
('AE 05-02-2026 04', 15, 0, 45.5, 0.8, 0.15, 2.3, 60, 62, 61, 1.7, 81, 83, 82, 47, 'Anode', '2026-02-05 11:00:00'),
('AE 05-02-2026 05', 9, 0, 44.7, 0.7, 0.14, 2.2, 59, 60, 58, 1.5, 78, 80, 79, 45, 'Anode', '2026-02-05 12:00:00'),
('AE 12-02-2026 01', 9, 0, 45.1, 0.8, 0.15, 2.3, 60, 61, 59, 1.5, 80, 82, 81, 46, 'Anode', '2026-02-12 08:00:00'),
('AE 12-02-2026 02', 11, 0, 44.8, 0.7, 0.14, 2.2, 61, 60, 62, 1.6, 79, 81, 80, 45, 'Anode', '2026-02-12 09:00:00'),
('AE 12-02-2026 03', 14, 0, 46, 0.9, 0.16, 2.4, 62, 63, 61, 1.4, 83, 84, 82, 47, 'Anode', '2026-02-12 10:00:00'),
('AE 12-02-2026 04', 8, 0, 45.4, 0.8, 0.15, 2.3, 60, 62, 61, 1.7, 81, 83, 82, 44, 'Anode', '2026-02-12 11:00:00'),
('AE 12-02-2026 05', 12, 0, 44.6, 0.7, 0.14, 2.2, 59, 60, 58, 1.5, 78, 80, 79, 45, 'Anode', '2026-02-12 12:00:00'),
('AE 20-02-2026 01', 10, 0, 45, 0.8, 0.15, 2.3, 60, 61, 59, 1.5, 80, 82, 81, 45, 'Anode', '2026-02-20 08:00:00'),
('AE 20-02-2026 02', 11, 0, 44.9, 0.7, 0.14, 2.2, 61, 60, 62, 1.6, 79, 81, 80, 44, 'Anode', '2026-02-20 09:00:00'),
('AE 20-02-2026 03', 13, 0, 46.2, 0.9, 0.16, 2.4, 62, 63, 61, 1.4, 83, 84, 82, 46, 'Anode', '2026-02-20 10:00:00'),
('AE 20-02-2026 04', 9, 0, 45.6, 0.8, 0.15, 2.3, 60, 62, 61, 1.7, 81, 83, 82, 47, 'Anode', '2026-02-20 11:00:00'),
('AE 20-02-2026 05', 14, 0, 44.7, 0.7, 0.14, 2.2, 59, 60, 58, 1.5, 78, 80, 79, 45, 'Anode', '2026-02-20 12:00:00'),
('AE 22-02-2026 10', 0, 1, 35, 41, 42, 40, 12, 13, NULL, 16, 14, 15, NULL, NULL, 'Anode', '2026-02-22 11:44:52'),
('AE 22-02-2026 undefined', 0, 1, NULL, 41, 42, 40, NULL, NULL, NULL, NULL, 14, NULL, NULL, NULL, 'Anode', '2026-02-22 11:43:47'),
('CE 05-02-2026 01', 11, 0, 48.2, 0.6, 0.18, 2.6, 65, 66, 64, 1.8, 85, 86, 84, 42, 'Cathode', '2026-02-05 08:20:00'),
('CE 05-02-2026 02', 7, 0, 47.9, 0.5, 0.17, 2.5, 66, 67, 65, 1.9, 86, 87, 85, 43, 'Cathode', '2026-02-05 09:10:00'),
('CE 05-02-2026 03', 13, 0, 48.5, 0.6, 0.18, 2.6, 67, 66, 68, 1.7, 87, 88, 86, 44, 'Cathode', '2026-02-05 10:20:00'),
('CE 05-02-2026 04', 10, 0, 47.8, 0.5, 0.17, 2.5, 65, 64, 66, 1.8, 85, 84, 86, 42, 'Cathode', '2026-02-05 11:30:00'),
('CE 05-02-2026 05', 14, 0, 48.9, 0.7, 0.19, 2.7, 68, 69, 67, 1.9, 88, 89, 87, 45, 'Cathode', '2026-02-05 12:30:00'),
('CE 12-02-2026 01', 10, 0, 48.1, 0.6, 0.18, 2.6, 65, 66, 64, 1.8, 85, 86, 84, 42, 'Cathode', '2026-02-12 08:15:00'),
('CE 12-02-2026 02', 13, 0, 47.7, 0.5, 0.17, 2.5, 66, 67, 65, 1.9, 86, 87, 85, 43, 'Cathode', '2026-02-12 09:15:00'),
('CE 12-02-2026 03', 9, 0, 48.4, 0.6, 0.18, 2.6, 67, 66, 68, 1.7, 87, 88, 86, 44, 'Cathode', '2026-02-12 10:15:00'),
('CE 12-02-2026 04', 15, 0, 47.6, 0.5, 0.17, 2.5, 65, 64, 66, 1.8, 85, 84, 86, 42, 'Cathode', '2026-02-12 11:15:00'),
('CE 12-02-2026 05', 7, 0, 48.8, 0.7, 0.19, 2.7, 68, 69, 67, 1.9, 88, 89, 87, 45, 'Cathode', '2026-02-12 12:15:00'),
('CE 20-02-2026 01', 8, 0, 48.3, 0.6, 0.18, 2.6, 65, 66, 64, 1.8, 85, 86, 84, 42, 'Cathode', '2026-02-20 08:15:00'),
('CE 20-02-2026 02', 12, 0, 47.8, 0.5, 0.17, 2.5, 66, 67, 65, 1.9, 86, 87, 85, 43, 'Cathode', '2026-02-20 09:15:00'),
('CE 20-02-2026 03', 15, 0, 48.6, 0.6, 0.18, 2.6, 67, 66, 68, 1.7, 87, 88, 86, 44, 'Cathode', '2026-02-20 10:15:00'),
('CE 20-02-2026 04', 10, 0, 47.9, 0.5, 0.17, 2.5, 65, 64, 66, 1.8, 85, 84, 86, 42, 'Cathode', '2026-02-20 11:15:00'),
('CE 20-02-2026 05', 9, 0, 48.7, 0.7, 0.19, 2.7, 68, 69, 67, 1.9, 88, 89, 87, 45, 'Cathode', '2026-02-20 12:15:00'),
('CE 22-02-2026 10', 0, 1, 33, 38, 39, 37, 22, 23, 24, 29, 25, 26, NULL, 30, 'Cathode', '2026-02-22 11:54:03'),
('CE 22-02-2026 undefined', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 29, NULL, NULL, NULL, 30, 'Cathode', '2026-02-22 11:53:49');

-- --------------------------------------------------------

--
-- Table structure for table `error_log_nodered`
--

CREATE TABLE `error_log_nodered` (
  `SR_NO` int(11) NOT NULL,
  `dateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `error_code` varchar(50) DEFAULT NULL,
  `error_detail` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plc3`
--

CREATE TABLE `plc3` (
  `terminal_prod_count` text NOT NULL,
  `SCH_1_POWER_KW_1` text DEFAULT NULL,
  `SCH_1_POWER_KW_2` text DEFAULT NULL,
  `SCH_1_POWER_KW_3` text DEFAULT NULL,
  `SCH_1_POWER_KW_4` text DEFAULT NULL,
  `SCH_2_POWER_KW_1` text DEFAULT NULL,
  `SCH_2_POWER_KW_2` text DEFAULT NULL,
  `SCH_2_POWER_KW_3` text DEFAULT NULL,
  `SCH_2_POWER_KW_4` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plc3`
--

INSERT INTO `plc3` (`terminal_prod_count`, `SCH_1_POWER_KW_1`, `SCH_1_POWER_KW_2`, `SCH_1_POWER_KW_3`, `SCH_1_POWER_KW_4`, `SCH_2_POWER_KW_1`, `SCH_2_POWER_KW_2`, `SCH_2_POWER_KW_3`, `SCH_2_POWER_KW_4`) VALUES
('JR 28-11-2025 0', '32,32,32,32,32', '32,32,32,32,32', '32,32,32,32,32', '32,32,32,32,32', '32,32,32,32,32', '32,32,32,32,32', '32,32,32,32,32', '32,32,32,32,32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `USER_NO` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `auth_level` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`USER_NO`, `username`, `password`, `created_at`, `auth_level`) VALUES
(1, 'admin', 'Admin@1234', '2025-05-26 10:30:54', 'admin'),
(3, 'abhishek', '1234', '2025-05-27 07:29:37', 'basic');

-- --------------------------------------------------------

--
-- Table structure for table `winding_plc`
--

CREATE TABLE `winding_plc` (
  `serial_num` int(11) NOT NULL,
  `roll_weight` varchar(50) DEFAULT NULL,
  `roll_dia` float DEFAULT NULL,
  `date_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `winding_plc`
--

INSERT INTO `winding_plc` (`serial_num`, `roll_weight`, `roll_dia`, `date_time`) VALUES
(222, '123', 4444, '2026-02-22 09:37:07'),
(333, '123', 4444, '2026-02-22 09:37:36'),
(555, '222', 0.333, '2026-02-22 09:39:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `batch_electrode_mapping`
--
ALTER TABLE `batch_electrode_mapping`
  ADD PRIMARY KEY (`batch_id`,`electrode_id`);

--
-- Indexes for table `batch_main`
--
ALTER TABLE `batch_main`
  ADD PRIMARY KEY (`batch_id`);

--
-- Indexes for table `battery_cell_mapping`
--
ALTER TABLE `battery_cell_mapping`
  ADD PRIMARY KEY (`battery_id`);

--
-- Indexes for table `battery_main`
--
ALTER TABLE `battery_main`
  ADD PRIMARY KEY (`battery_id`);

--
-- Indexes for table `cathode`
--
ALTER TABLE `cathode`
  ADD PRIMARY KEY (`electrode_id`);

--
-- Indexes for table `cell_electrode_mapping`
--
ALTER TABLE `cell_electrode_mapping`
  ADD PRIMARY KEY (`cell_id`);

--
-- Indexes for table `cell_main`
--
ALTER TABLE `cell_main`
  ADD PRIMARY KEY (`cell_id`);

--
-- Indexes for table `electrode`
--
ALTER TABLE `electrode`
  ADD PRIMARY KEY (`electrode_id`);

--
-- Indexes for table `error_log_nodered`
--
ALTER TABLE `error_log_nodered`
  ADD PRIMARY KEY (`SR_NO`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`USER_NO`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `winding_plc`
--
ALTER TABLE `winding_plc`
  ADD UNIQUE KEY `serial_num` (`serial_num`),
  ADD UNIQUE KEY `serial_num_2` (`serial_num`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `error_log_nodered`
--
ALTER TABLE `error_log_nodered`
  MODIFY `SR_NO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `USER_NO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
