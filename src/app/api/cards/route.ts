import { client } from "../connect";
import { cardPOST, postResponse } from "@/app/helpers/types";
import { cleanCards } from "../validate";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await client.connect();

    const databse = client.db("studySql");
    const cards = databse.collection("Cards");

    const card = cards.find({});

    const all = await card.toArray();

    return Response.json(all);
  } catch (e) {
    console.error(e);
  }
}

export async function POST(request: Request) {
  try {
    await client.connect();

    const database = client.db("studySql");
    const cards = database.collection("Cards");

    let res: cardPOST[] = await request.json();

    console.log(typeof res);
  
    for (let card of res) {
      if ((await cleanCards(card)) === false) {
        return NextResponse.json(
          { error: "Invalid data provided" },
          { status: 401 }
        );
      }
    }

    await cards.insertMany(res);

    let response: postResponse = {
      body: { message: "Data inserted succesfully" },
      status: 200,
    };

    return NextResponse.json( response );
  } catch (e) {
    console.error(e);
  }
}
