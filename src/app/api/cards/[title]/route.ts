import { client } from "../../connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await client.connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const databse = client.db("studySql");
    const cards = databse.collection("Cards");

    const query = {
      Deck_ID: id,
    };

    console.log(id);

    const card = cards.find(query);
    const all = await card.toArray();

    return NextResponse.json(all, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error fetching data" }, { status: 501 }); // TODO: change '501' to the correct status code
  }
}
