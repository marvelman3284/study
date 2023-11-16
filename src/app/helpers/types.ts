import { ObjectId } from "mongodb";

type cardPOST = {
  Deck_ID: string,
  FrontText: string,
  BackText: string,
}

type deckPOST = {
  User_ID: string,
  Title: string,
  Description?: string
}

type postResponseBody = {
  message: string,
  id?: ObjectId
}

type postResponse = {
  body: postResponseBody,
  status: number
}

export type {  cardPOST, deckPOST , postResponse };
