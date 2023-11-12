import { NextRequest, NextResponse } from "next/server";
import knex from "knex";
import dotenv from "dotenv";

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


export async function GET() {
  try {
    const cards = await db.select("*").from('Flashcards');
    return Response.json( {cards})
  } catch (error) {
    console.error(error);
  }
}
