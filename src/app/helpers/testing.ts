// TODO: needs a function that should take input from an html form (for creating a set) and inserts into `deck` and `set` tables

import knex from "knex";
import dotenv from "dotenv";
import { flashcard, flashcardList } from "./types";

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

function createDeck(
  title: string,
  description: string,
  userID: number,
  flashcards: flashcardList
) {
  db("Decks")
    .insert([{ Title: title, User_ID: userID, Description: description }])
    .finally(() => {
      db.destroy();
    });

  let deck_id: number = 0; // FIX: promise is being rejected, need to find out why, then use to insert flashcard or find a better way 

  db("Decks")
    .select("Deck_ID")
    .where({ Title: title })
    .then((rows) => {
      console.log(rows[0].Deck_ID);
      deck_id = rows[0].Deck_ID;
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      db.destroy();
    });
  for (let card of flashcards) {
    // db('Flashcards').insert([{ FrontText: card.term, BackText: card.def }]).finally(()=>{db.destroy()})
    insertFlashCard(card, deck_id); // FIX: titles must be unique or else this doesn't work, needs to be fixed
  }
}

function insertFlashCard(flashcard: flashcard, deck_id: number) {
  db("Flashcards")
    .insert([
      { FrontText: flashcard.term, BackText: flashcard.def, Deck_ID: deck_id },
    ])
    .finally(() => db.destroy());
}

// db("Decks").insert({ Title: "calc 1", User_ID: "1", Description: "yadya" }).finally(() => {db.destroy()});

//
const items: flashcardList = [{ id: "1", term: "d/dx[y]", def: "y" }];

createDeck("Calc 5", "Calc 3 Derivatives", 1, items);

db.destroy();
