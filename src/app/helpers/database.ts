// TODO: needs a function that should take input from an html form (for creating a set) and inserts into `deck` and `set` tables

import knex from 'knex';
import dotenv from 'dotenv';
import { flashcard, flashcardList} from './types';

dotenv.config();

const knexConf = {
  client: 'mysql',
  connection: {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  }
};

const db = knex(knexConf);

function createDeck(title: string, description: string, userID: number, flashcards: flashcardList) {
  db.insert(
    [
      { Title: title, User_ID: userID, Description: description}
    ]
  )
  .into('Decks');

  const deckID = db('Users').where({ Title: title });


  for (const flashcard in flashcards) {
    db.insert(
      [
        { FrontText: flashcard.term, BackText: flashcard.defintion }
      ]
    )
    .into('Flashcards');
  }
}

function insertFlashCard(flashcard: flashcard) {
  db.insert(
    [
      { FrontText: flashcard.term, BackText: flashcard.defintion}
    ]
  )
  .into('Flashcards');
}

db.select('Username', 'User_ID', 'Password')
  .from('Users')
  .then((rows) => {
    console.log(rows);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    db.destroy();
  });

