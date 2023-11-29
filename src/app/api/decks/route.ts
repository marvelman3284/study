import { client } from "../connect";
import { deckGET, deckPOST, postResponse } from "@/app/helpers/types";
import { NextResponse } from "next/server";
import { cleanSets } from "../validate";

export async function GET() {
  try {
    await client.connect();

    const database = client.db("studySql");
    const decks = database.collection("Sets");

    const deck = decks.find({});

    const all = await deck.toArray();

    const res: deckGET[] = [];

    for (let item of all) {
      res.push(
        {
          id: item._id.toString(),
          Title: item.Title,
          Description: item.Description,
          User_ID: item.User_ID
        }
      )
    }

    return Response.json(res);
  } catch (e) {
    return Response.json( {body: "error", error: `${e}`}, {status: 500})
  }
}

export async function POST(request: Request) {
  try {
    await client.connect();

    console.log("40");

    const database = client.db("studySql");
    const cards = database.collection("Sets");

    let res: deckPOST = await request.json();

    console.log('################################')
    console.log(res);

    if ((await cleanSets(res)) === false) {
      let response: postResponse = {
        body: { message: "Error inserting data, invalid data provided"},
        status: 403
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
