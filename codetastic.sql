-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 25 Maj 2023, 08:41
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
-- Baza danych: `codetastic`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chapters`
--

CREATE TABLE `chapters` (
  `chapterID` int(11) NOT NULL,
  `chapterName` text NOT NULL,
  `courseID` int(11) NOT NULL,
  `route` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `chapters`
--

INSERT INTO `chapters` (`chapterID`, `chapterName`, `courseID`, `route`) VALUES
(1, '0. Intro', 1, '/intro'),
(2, '1. Basics', 1, '/basics'),
(3, '0. Intro', 2, '/intro');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `courses`
--

CREATE TABLE `courses` (
  `courseID` int(11) NOT NULL,
  `courseName` text NOT NULL,
  `route` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `courses`
--

INSERT INTO `courses` (`courseID`, `courseName`, `route`) VALUES
(1, 'JavaScript', '/JS'),
(2, 'React', '/React'),
(3, 'Python', '/Python');

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
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`chapterID`),
  ADD KEY `courseID` (`courseID`);

--
-- Indeksy dla tabeli `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`courseID`);

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
  ADD PRIMARY KEY (`lessonID`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `chapters`
--
ALTER TABLE `chapters`
  MODIFY `chapterID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`);

--
-- Ograniczenia dla tabeli `lessonnames`
--
ALTER TABLE `lessonnames`
  ADD CONSTRAINT `lessonnames_ibfk_1` FOREIGN KEY (`chapterID`) REFERENCES `chapters` (`chapterID`),
  ADD CONSTRAINT `lessonnames_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`);

--
-- Ograniczenia dla tabeli `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_2` FOREIGN KEY (`lessonID`) REFERENCES `lessonnames` (`lessonNameID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
