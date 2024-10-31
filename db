-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.39 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- sample 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `sample` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sample`;

-- 테이블 sample.rp_tbl_comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `rp_tbl_comment` (
  `id_C` int NOT NULL AUTO_INCREMENT,
  `postId_CC` int DEFAULT NULL,
  `userId_CC` varchar(50) DEFAULT NULL,
  `comment` text,
  `created_C` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_C`),
  KEY `postId_CC` (`postId_CC`),
  KEY `userId_CC` (`userId_CC`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.rp_tbl_comment:~4 rows (대략적) 내보내기
INSERT IGNORE INTO `rp_tbl_comment` (`id_C`, `postId_CC`, `userId_CC`, `comment`, `created_C`) VALUES
	(53, 59, 'user01', '보노보노 ', '2024-10-30 05:05:39'),
	(54, 57, 'user01', '아구몬 ', '2024-10-30 05:05:43'),
	(55, 58, 'user01', '몰랑이', '2024-10-30 05:05:53'),
	(56, 57, 'sns0001', '그레이몬', '2024-10-30 05:06:57');

-- 테이블 sample.rp_tbl_dm 구조 내보내기
CREATE TABLE IF NOT EXISTS `rp_tbl_dm` (
  `id_D` int NOT NULL AUTO_INCREMENT,
  `senderId_C` int DEFAULT NULL,
  `receiverId_C` int DEFAULT NULL,
  `message` text,
  `created_D` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_D`),
  KEY `senderId_C` (`senderId_C`),
  KEY `receiverId_C` (`receiverId_C`),
  CONSTRAINT `rp_tbl_dm_ibfk_1` FOREIGN KEY (`senderId_C`) REFERENCES `rp_tbl_user` (`id_U`),
  CONSTRAINT `rp_tbl_dm_ibfk_2` FOREIGN KEY (`receiverId_C`) REFERENCES `rp_tbl_user` (`id_U`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.rp_tbl_dm:~0 rows (대략적) 내보내기

-- 테이블 sample.rp_tbl_feed 구조 내보내기
CREATE TABLE IF NOT EXISTS `rp_tbl_feed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId_FC` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `content` text,
  `cdatetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `favorite` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.rp_tbl_feed:~4 rows (대략적) 내보내기
INSERT IGNORE INTO `rp_tbl_feed` (`id`, `userId_FC`, `content`, `cdatetime`, `favorite`) VALUES
	(57, 'user01', '손오공 키티 아구몬 ', '2024-10-30 05:04:35', 0),
	(58, 'user01', '몰랑이 라바 뽀로로 유성씨', '2024-10-30 05:05:04', 0),
	(59, 'user01', '보노보노삼형제', '2024-10-30 05:05:17', 0),
	(60, 'user01', '캐릭터 12종', '2024-10-30 07:25:00', 0);

-- 테이블 sample.rp_tbl_feed_img 구조 내보내기
CREATE TABLE IF NOT EXISTS `rp_tbl_feed_img` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feed_id` int NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.rp_tbl_feed_img:~22 rows (대략적) 내보내기
INSERT IGNORE INTO `rp_tbl_feed_img` (`id`, `feed_id`, `img_path`, `cdatetime`) VALUES
	(121, 57, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730264675752.png', '2024-10-30 14:04:35'),
	(122, 57, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730264675754.png', '2024-10-30 14:04:35'),
	(123, 57, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730264675755.png', '2024-10-30 14:04:35'),
	(124, 58, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730264704953.png', '2024-10-30 14:05:04'),
	(125, 58, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730264704954.png', '2024-10-30 14:05:04'),
	(126, 58, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730264704954.png', '2024-10-30 14:05:04'),
	(127, 58, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730264704955.png', '2024-10-30 14:05:04'),
	(128, 59, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730264717634.jpg', '2024-10-30 14:05:17'),
	(129, 59, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730264717634.jpg', '2024-10-30 14:05:17'),
	(130, 59, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730264717635.jpg', '2024-10-30 14:05:17'),
	(131, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100007.png', '2024-10-30 16:25:00'),
	(132, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100010.png', '2024-10-30 16:25:00'),
	(133, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100011.png', '2024-10-30 16:25:00'),
	(134, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100012.png', '2024-10-30 16:25:00'),
	(135, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100012.png', '2024-10-30 16:25:00'),
	(136, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100012.png', '2024-10-30 16:25:00'),
	(137, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100015.png', '2024-10-30 16:25:00'),
	(138, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100016.png', '2024-10-30 16:25:00'),
	(139, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100017.jpg', '2024-10-30 16:25:00'),
	(140, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100017.jpg', '2024-10-30 16:25:00'),
	(141, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100017.jpg', '2024-10-30 16:25:00'),
	(142, 60, 'C:\\Users\\TJ-BU-708-P04\\Downloads\\react-sample-project_v0.1\\server\\img\\1730273100018.jpg', '2024-10-30 16:25:00');

-- 테이블 sample.rp_tbl_followers 구조 내보내기
CREATE TABLE IF NOT EXISTS `rp_tbl_followers` (
  `id_F` int NOT NULL AUTO_INCREMENT,
  `follower_id_C` int DEFAULT NULL,
  `followed_id_C` int DEFAULT NULL,
  `created_F` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_F`),
  KEY `follower_id_C` (`follower_id_C`),
  KEY `followed_id_C` (`followed_id_C`),
  CONSTRAINT `rp_tbl_followers_ibfk_1` FOREIGN KEY (`follower_id_C`) REFERENCES `rp_tbl_user` (`id_U`),
  CONSTRAINT `rp_tbl_followers_ibfk_2` FOREIGN KEY (`followed_id_C`) REFERENCES `rp_tbl_user` (`id_U`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.rp_tbl_followers:~0 rows (대략적) 내보내기

-- 테이블 sample.rp_tbl_likes 구조 내보내기
CREATE TABLE IF NOT EXISTS `rp_tbl_likes` (
  `id_L` int NOT NULL AUTO_INCREMENT,
  `postId_LC` int DEFAULT NULL,
  `userId_LC` int DEFAULT NULL,
  `created_L` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_L`),
  KEY `postId_LC` (`postId_LC`),
  KEY `userId_LC` (`userId_LC`),
  CONSTRAINT `rp_tbl_likes_ibfk_1` FOREIGN KEY (`postId_LC`) REFERENCES `rp_tbl_post` (`id_P`),
  CONSTRAINT `rp_tbl_likes_ibfk_2` FOREIGN KEY (`userId_LC`) REFERENCES `rp_tbl_user` (`id_U`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.rp_tbl_likes:~0 rows (대략적) 내보내기

-- 테이블 sample.rp_tbl_noti 구조 내보내기
CREATE TABLE IF NOT EXISTS `rp_tbl_noti` (
  `id_N` int NOT NULL AUTO_INCREMENT,
  `userId_NC` int DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `source_id` int DEFAULT NULL,
  `created_N` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_N`),
  KEY `userId_NC` (`userId_NC`),
  CONSTRAINT `rp_tbl_noti_ibfk_1` FOREIGN KEY (`userId_NC`) REFERENCES `rp_tbl_user` (`id_U`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.rp_tbl_noti:~0 rows (대략적) 내보내기

-- 테이블 sample.rp_tbl_post 구조 내보내기
CREATE TABLE IF NOT EXISTS `rp_tbl_post` (
  `id_P` int NOT NULL AUTO_INCREMENT,
  `userId_PC` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `caption` text,
  `created_P` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_P`),
  KEY `userId_PC` (`userId_PC`),
  CONSTRAINT `rp_tbl_post_ibfk_1` FOREIGN KEY (`userId_PC`) REFERENCES `rp_tbl_user` (`id_U`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.rp_tbl_post:~0 rows (대략적) 내보내기

-- 테이블 sample.rp_tbl_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `rp_tbl_user` (
  `id_U` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `created_U` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `err` int DEFAULT '0',
  PRIMARY KEY (`id_U`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sample.rp_tbl_user:~4 rows (대략적) 내보내기
INSERT IGNORE INTO `rp_tbl_user` (`id_U`, `userId`, `username`, `email`, `password`, `profile_picture`, `bio`, `created_U`, `err`) VALUES
	(1, 'user01', '아이언맨', 'akfnz123@naver.com', 'user01', NULL, NULL, '2024-10-23 00:36:32', NULL),
	(3, 'user011', '아이언맨', 'ex1234@example.com', 'user01', NULL, NULL, '2024-10-23 01:41:20', NULL),
	(4, 'user0111', '아이언맨', 'ex1235@example.com', 'user01', NULL, NULL, '2024-10-23 01:41:20', NULL),
	(5, 'akfnz123', '테스터1', 'akfnz1234@naver.com', 'test1234!', NULL, NULL, '2024-10-23 03:07:45', NULL),
	(6, 'akfnz1234', '테스터', 'test123@naver.com', 'xptmxm1!', NULL, NULL, '2024-10-23 03:14:00', 0),
	(7, 'akfnz12345', 'ddd', 'dddd@naver.com', '12345!!!1a', NULL, NULL, '2024-10-28 06:41:35', 0),
	(8, 'sns0001', '주인장', 'akfnz123@naver.com3', 'sns0001!', NULL, NULL, '2024-10-30 03:17:36', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
