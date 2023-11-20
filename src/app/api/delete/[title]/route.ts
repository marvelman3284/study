import { client } from '@/app/api/connect'
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  try {
    await client.connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || null;

    if (id === null) {
      return NextResponse.json({
        error: "invalid paramaters provided"
      }, { status: 400 });
    }

    const database = client.db("studySql");
    const cards = database.collection("Cards");
    const sets = database.collection("Sets");

    const cardQuery = {
      Deck_ID: id
    };

    const setQuery = {
      _id: new ObjectId(id),
    }
    
    const deleteCards = await cards.deleteMany(cardQuery);
    const deleteSets = await sets.deleteMany(setQuery);

    return NextResponse.json({body: `Deck with id ${id} deleted`}, { status: 200 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({
      error: "error fetching data"
    }, { status: 501});
  }
}
