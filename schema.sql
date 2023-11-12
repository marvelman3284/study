-- Create the database
CREATE DATABASE QuizletDB;
USE QuizletDB;

-- Create the Users table
CREATE TABLE Users (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    ProfileInfo TEXT,
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastLoginDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Decks table
CREATE TABLE Decks (
    Deck_ID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    User_ID INT,
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastModifiedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
);

-- Create the Flashcards table
CREATE TABLE Flashcards (
    Flashcard_ID INT AUTO_INCREMENT PRIMARY KEY,
    Deck_ID INT,
    FrontText TEXT NOT NULL,
    BackText TEXT NOT NULL,
    Position INT,
    FOREIGN KEY (Deck_ID) REFERENCES Decks(Deck_ID)
);
