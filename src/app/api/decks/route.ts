import { client } from "../connect";
import { deckPOST, postResponse } from "@/app/helpers/types";
import { NextResponse } from "next/server";
import { cleanSets } from "../validate";

export async function GET() {
  try {
    await client.connect();

    const database = client.db("studySql");
    const decks = database.collection("Sets");

    const deck = decks.find({});

    const all = await deck.toArray();

    return Response.json(all);
  } catch (e) {
    console.error(e);
  }
}

export async function POST(request: Request) {
  try {
    await client.connect();

    const database = client.db("studySql");
    const cards = database.collection("Sets");

    let res: deckPOST = await request.json();

    if ((await cleanSets(res)) === false) {
      let response: postResponse = {
        body: { message: "Error inserting data, invalid data provided"},
        status: 400
      }
      return NextResponse.json(response);
    }

    let result = await cards.insertOne(res);

    let response: postResponse = {
      body: { message: "Data inserted succesfully", id: result.insertedId },
      status: 200,
    };

    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
  }
}