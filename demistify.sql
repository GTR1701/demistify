-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 04 Lip 2023, 20:11
-- Wersja serwera: 10.4.24-MariaDB
-- Wersja PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `demistify`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chapternames`
--

CREATE TABLE `chapternames` (
  `ID` int(11) NOT NULL,
  `chapterName` varchar(100) NOT NULL,
  `courseID` int(11) NOT NULL,
  `Route` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `chapternames`
--

INSERT INTO `chapternames` (`ID`, `chapterName`, `courseID`, `Route`) VALUES
(1, '0. Intro', 1, '/intro'),
(2, '1. Basics', 1, '/basics'),
(3, '0. Intro', 2, '/intro');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chapters`
--

CREATE TABLE `chapters` (
  `chapterID` int(11) NOT NULL,
  `chapterName` int(11) NOT NULL,
  `courseID` int(11) NOT NULL,
  `route` text NOT NULL,
  `content` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `chapters`
--

INSERT INTO `chapters` (`chapterID`, `chapterName`, `courseID`, `route`, `content`) VALUES
(1, 1, 1, '/intro', ''),
(2, 2, 1, '/basics', ''),
(3, 3, 2, '/intro', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `coursenames`
--

CREATE TABLE `coursenames` (
  `ID` int(11) NOT NULL,
  `courseName` varchar(100) NOT NULL,
  `Route` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `coursenames`
--

INSERT INTO `coursenames` (`ID`, `courseName`, `Route`) VALUES
(1, 'JavaScript', '/JS'),
(2, 'React', '/React'),
(3, 'Python', '/Python');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `courses`
--

CREATE TABLE `courses` (
  `courseID` int(11) NOT NULL,
  `courseName` int(11) NOT NULL,
  `route` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `courses`
--

INSERT INTO `courses` (`courseID`, `courseName`, `route`) VALUES
(1, 1, '/JS'),
(2, 2, '/React'),
(3, 3, '/Python');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lessonnames`
--

CREATE TABLE `lessonnames` (
  `lessonNameID` int(11) NOT NULL,
  `lessonName` text NOT NULL,
  `chapterID` int(11) NOT NULL,
  `courseID` int(11) NOT NULL,
  `route` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `lessonnames`
--

INSERT INTO `lessonnames` (`lessonNameID`, `lessonName`, `chapterID`, `courseID`, `route`) VALUES
(1, 'Introduction to JavaScript', 1, 1, '/1'),
(2, 'Test', 1, 1, '/2'),
(3, 'Introduction to React', 3, 2, '/React');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `lessons`
--

CREATE TABLE `lessons` (
  `lessonID` int(11) NOT NULL,
  `lessonName` int(11) NOT NULL,
  `chapterID` int(11) NOT NULL,
  `lessonContent` text NOT NULL,
  `route` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `uid` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `hasJS` bit(1) NOT NULL DEFAULT b'0',
  `hasReact` bit(1) NOT NULL DEFAULT b'0',
  `hasPython` bit(1) NOT NULL DEFAULT b'0',
  `hasNode` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`ID`, `uid`, `username`, `password`, `email`, `hasJS`, `hasReact`, `hasPython`, `hasNode`) VALUES
(1, 'a294ec2f-c6fd-56ff-b303-46fcd2d48ad8', 'dawidkowal04@gmail.com', '$2a$10$DcmCLgF4o2.VwVxYvvRBmONaOdL9K72SfSWYzSBrdb45Qyu2Zx28O', 'dawidkowal04@gmail.com', b'1', b'0', b'0', b'0'),
(2, 'd4c286cb-0509-551a-97be-a35e7b7bf918', 'GTR1701', '$2a$10$2Ikofiq9TZJurt9NfYwW9.vMM/AahHvMoV5nvpnHEzV7JZuZPxRJW', 'dawidkowal04@gmail.com', b'0', b'0', b'0', b'0'),
(3, 'd4c286cb-0509-551a-97be-a35e7b7bf918', 'GTR1701', '$2a$10$lYV2obs8u2IAhVJ41Jq8kePdieGIBGm0cgXqtJnm.sWvNlCschMSm', 'dawidkowal04@gmail.com', b'0', b'0', b'0', b'0'),
(4, 'd4c286cb-0509-551a-97be-a35e7b7bf918', 'GTR1701', '$2a$10$9CsF7b9.xKgn61mhgt4Pbu4if/Njxz495TDS9RoiqbA.1Cey3opjS', 'dawidkowal04@gmail.com', b'0', b'0', b'0', b'0');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `chapternames`
--
ALTER TABLE `chapternames`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `courseID` (`courseID`);

--
-- Indeksy dla tabeli `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`chapterID`),
  ADD KEY `courseID` (`courseID`),
  ADD KEY `chapters_ibfk_2` (`chapterName`);

--
-- Indeksy dla tabeli `coursenames`
--
ALTER TABLE `coursenames`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`courseID`),
  ADD KEY `courses_ibfk_1` (`courseName`);

--
-- Indeksy dla tabeli `lessonnames`
--
ALTER TABLE `lessonnames`
  ADD PRIMARY KEY (`lessonNameID`),
  ADD KEY `chapterID` (`chapterID`),
  ADD KEY `courseID` (`courseID`);

--
-- Indeksy dla tabeli `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`lessonID`),
  ADD KEY `chapterID` (`chapterID`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `chapternames`
--
ALTER TABLE `chapternames`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `chapters`
--
ALTER TABLE `chapters`
  MODIFY `chapterID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `coursenames`
--
ALTER TABLE `coursenames`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `courses`
--
ALTER TABLE `courses`
  MODIFY `courseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `lessonnames`
--
ALTER TABLE `lessonnames`
  MODIFY `lessonNameID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `lessons`
--
ALTER TABLE `lessons`
  MODIFY `lessonID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `chapternames`
--
ALTER TABLE `chapternames`
  ADD CONSTRAINT `chapternames_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `coursenames` (`ID`);

--
-- Ograniczenia dla tabeli `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`),
  ADD CONSTRAINT `chapters_ibfk_2` FOREIGN KEY (`chapterName`) REFERENCES `chapternames` (`ID`);

--
-- Ograniczenia dla tabeli `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`courseName`) REFERENCES `coursenames` (`ID`);

--
-- Ograniczenia dla tabeli `lessonnames`
--
ALTER TABLE `lessonnames`
  ADD CONSTRAINT `lessonnames_ibfk_1` FOREIGN KEY (`chapterID`) REFERENCES `chapternames` (`ID`),
  ADD CONSTRAINT `lessonnames_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `coursenames` (`ID`);

--
-- Ograniczenia dla tabeli `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_2` FOREIGN KEY (`lessonID`) REFERENCES `lessonnames` (`lessonNameID`),
  ADD CONSTRAINT `lessons_ibfk_3` FOREIGN KEY (`chapterID`) REFERENCES `chapters` (`chapterID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
