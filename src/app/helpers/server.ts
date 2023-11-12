// TODO: needs a function that should take input from an html form (for creating a set) and inserts into `deck` and `set` tables

import knex from "knex";
import dotenv from "dotenv";
import { flashcard, flashcardList } from "./types";
import express, { Request, Response } from 'express';

dotenv.config();

const knexConf = {
  client: "mysql",
  connection: {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
};

const db = knex(knexConf);
const app = express();
const PORT: number = 3001

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace * with the specific origin you want to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/cards', async (req: Request, res: Response) => {
  try {
    const cards = await db.select("*").from('Flashcards');
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' })
  }
});

async function createDeck(
  title: string,
  userID: number,
  flashcards: flashcardList,
  description: string = ""
) {
  try {
    // Insert into the 'Decks' table
    const deckInsertResult = await db("Decks").insert({
      Title: title,
      User_ID: userID,
      Description: description,
    });

    // Retrieve the 'Deck_ID' from the inserted deck
    const deckId = deckInsertResult[0];

    console.log(`Inserted deck with Deck_ID: ${deckId}`);

    // Iterate through flashcards and insert them
    for (let card of flashcards) {
      await insertFlashCard(card, deckId);
    }

    console.log("Flashcards inserted successfully.");

    // Close the connection
    db.destroy();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function insertFlashCard(card: flashcard, deckId: number) {
  try {
    // Insert into the 'Flashcards' table
    const flashcardInsertResult = await db("Flashcards").insert({
      FrontText: card.term,
      BackText: card.def,
      Deck_ID: deckId,
    });

    console.log(
      `Inserted flashcard with Flashcard_ID: ${flashcardInsertResult[0]}`
    );
  } catch (error) {
    console.error("Error inserting flashcard:", error);
  }
}

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

export { createDeck, insertFlashCard };
