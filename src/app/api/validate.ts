import { cardPOST, deckPOST } from "../helpers/types";
import { client } from "./connect";

export async function cleanCards(cardData: cardPOST) {
  // TODO: this is probably where the latex would be rendered i think?
  // TODO: make sure at least 1 card is being inserted
  if (
    (cardData.FrontText === undefined || cardData.FrontText === "") ||
    (cardData.BackText === undefined || cardData.FrontText === "") ||
    cardData.Deck_ID === undefined
  ) {
    return false;
  }

  const database = client.db("studySql");
  const decks = database.collection("Sets");

  const ids = await decks.distinct("_id");
  console.log(ids);
  let valid_id = false;

  for (let id of ids) {
    if (id.toString() === cardData.Deck_ID) {
      valid_id = true;
      break;
    }
  }

  return valid_id;
}

export async function cleanSets(setData: deckPOST) {
  if ((setData.Title === undefined) || (setData.Title === "") || setData.User_ID === undefined) {
    console.log("undef fields")
    return false;
  }

  const database = client.db("studySql");
  const decks = database.collection("Users");

  const ids = await decks.distinct("User_ID");
  let valid_id = false;

  for (let id of ids) {
    if (id === setData.User_ID) {
      valid_id = true;
      break;
    }
  }

  return valid_id;
}
