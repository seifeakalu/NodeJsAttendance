-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2021 at 04:33 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attendance`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `first_name`, `last_name`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'seo', 'seos', 'ss23', 'c63951235287ca3ec6d7c8f3fb05afcb7341b1c0a7ed9d12370d2eff3cc090ea', '2021-05-10 10:55:35', NULL),
(2, 'seife', 'Akalu', 'admin', 'f43a04fd04ad806eebb75d00feeeab487887ce2f5b4102d70ac75384b900fff3', '2021-05-10 10:56:20', '2021-05-10 10:57:18');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `room_no` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `room_no`, `created_at`, `updated_at`) VALUES
(1, 'room 3', '2021-05-10 10:03:24', '2021-05-15 15:54:19'),
(2, '3', '2021-05-10 10:04:31', NULL),
(3, '3sss', '2021-05-10 10:05:22', NULL),
(4, 'room 32', '2021-05-15 17:55:06', NULL),
(5, '3', '2021-08-29 05:45:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `class_courses`
--

CREATE TABLE `class_courses` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_courses`
--

INSERT INTO `class_courses` (`id`, `class_id`, `course_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2021-05-15 14:11:37', '2021-05-15 14:03:13');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 'programming', 'coding', '2021-05-12 15:48:45', NULL),
(2, 'programming', 'coding', '2021-05-12 15:48:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'computer sciecne', 'works fine', '2021-05-07 14:25:37', NULL),
(6, 'accounting', 'accounting dept', '2021-05-15 14:05:57', NULL),
(7, 'business ', 'business management ', '2021-05-15 14:06:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`id`, `first_name`, `last_name`, `phone`, `gender`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'seifa', 'akalu', '', '', 'ss', 'c63951235287ca3ec6d7c8f3fb05afcb7341b1c0a7ed9d12370d2eff3cc090ea', '2021-05-07 16:14:33', '2021-05-15 15:53:58'),
(2, 'seifu', 'akalu', '', '', 'ss2', 'c63951235287ca3ec6d7c8f3fb05afcb7341b1c0a7ed9d12370d2eff3cc090ea', '2021-05-07 16:15:32', '2021-05-15 15:53:45'),
(3, 'seo', 'seos', '0911111111', 'M', 'ss23', 'c63951235287ca3ec6d7c8f3fb05afcb7341b1c0a7ed9d12370d2eff3cc090ea', '2021-05-07 16:17:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `instructor_class_courses`
--

CREATE TABLE `instructor_class_courses` (
  `id` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `stream_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructor_class_courses`
--

INSERT INTO `instructor_class_courses` (`id`, `instructor_id`, `class_id`, `course_id`, `stream_id`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 1, 10, '2021-05-10 10:33:07', '2021-05-15 15:55:00'),
(2, 1, 1, 1, 10, '2021-05-10 10:34:16', '2021-05-15 17:50:21'),
(4, 1, 3, 1, 10, '2021-05-15 17:01:24', '2021-05-15 17:50:48'),
(5, 3, 1, 1, 10, '2021-05-15 17:51:30', '2021-05-16 05:54:32'),
(6, 2, 1, 1, 11, '2021-05-16 07:49:20', NULL),
(7, 3, 4, 2, 11, '2021-05-16 07:49:39', NULL),
(8, 2, 2, 1, 11, '2021-05-16 07:49:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `semister`
--

CREATE TABLE `semister` (
  `id` int(11) NOT NULL,
  `semister_no` varchar(100) NOT NULL,
  `year_of_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `semister`
--

INSERT INTO `semister` (`id`, `semister_no`, `year_of_id`, `created_at`, `updated_at`) VALUES
(1, '2', 0, '2021-05-08 10:52:09', NULL),
(2, '2', 0, '2021-05-10 09:26:14', NULL),
(3, 'second seme', 0, '2021-05-13 08:45:34', NULL),
(4, '1 st', 3, '2021-05-15 17:54:53', NULL),
(5, '32', 6, '2021-08-29 05:45:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stream`
--

CREATE TABLE `stream` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `department_id` int(11) NOT NULL,
  `year_of_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `semister_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stream`
--

INSERT INTO `stream` (`id`, `name`, `description`, `department_id`, `year_of_id`, `class_id`, `semister_id`, `created_at`, `updated_at`) VALUES
(10, 'accounting extension section 1', 'extension  programs', 6, 2, 3, 2, '2021-05-15 14:07:17', '2021-05-15 14:22:52'),
(11, 'computer science extension', 'extension students ', 1, 3, 4, 4, '2021-05-15 17:56:00', NULL),
(12, 'wewe', 'wewe', 7, 6, 1, 4, '2021-08-29 05:46:22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `stream_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_class_courses`
--

CREATE TABLE `student_class_courses` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `stream_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_class_courses`
--

INSERT INTO `student_class_courses` (`id`, `student_id`, `class_id`, `course_id`, `stream_id`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 1, 10, '2021-05-16 08:32:32', NULL),
(2, 1, 4, 2, 11, '2021-05-16 08:32:39', '2021-05-16 09:22:50'),
(3, 1, 4, 1, 11, '2021-05-16 09:26:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `year_of`
--

CREATE TABLE `year_of` (
  `id` int(11) NOT NULL,
  `year_date` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `year_of`
--

INSERT INTO `year_of` (`id`, `year_date`, `description`, `created_at`, `updated_at`) VALUES
(1, '2012', 'works fine', '2021-05-08 10:32:37', NULL),
(2, '2021-05-29', 'new program', '2021-05-15 14:21:27', NULL),
(3, '2020-05-06', '', '2021-05-15 17:53:59', NULL),
(4, '2021-07-14', 'aaa', '2021-07-11 15:41:03', NULL),
(5, '2021-08-19', 'hh', '2021-08-29 05:44:29', NULL),
(6, '2020-01-01', 'we we', '2021-08-29 05:45:16', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_courses`
--
ALTER TABLE `class_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructor_class_courses`
--
ALTER TABLE `instructor_class_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `semister`
--
ALTER TABLE `semister`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stream`
--
ALTER TABLE `stream`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_class_courses`
--
ALTER TABLE `student_class_courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `year_of`
--
ALTER TABLE `year_of`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `class_courses`
--
ALTER TABLE `class_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `instructor_class_courses`
--
ALTER TABLE `instructor_class_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `semister`
--
ALTER TABLE `semister`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stream`
--
ALTER TABLE `stream`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_class_courses`
--
ALTER TABLE `student_class_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `year_of`
--
ALTER TABLE `year_of`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
