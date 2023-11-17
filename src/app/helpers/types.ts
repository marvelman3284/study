import { ObjectId } from "mongodb";

type cardPOST = {
  Deck_ID: string,
  FrontText: string,
  BackText: string,
  id?: ObjectId
}

type deckGET = {
  User_ID: string,
  Title: string,
  Description?: string
  id: string
}
type deckPOST = {
  User_ID: string,
  Title: string,
  Description?: string
  id?: ObjectId
}

type postResponseBody = {
  message: string,
  id?: ObjectId
}

type postResponse = {
  body: postResponseBody,
  status: number
}

export type { deckGET, cardPOST, deckPOST , postResponse };
