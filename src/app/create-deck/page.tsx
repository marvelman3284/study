"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { cardPOST, deckPOST } from "../helpers/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Divider, Input } from "@nextui-org/react";

export default function App() {
  const [formData, setFormData] = useState<cardPOST[]>([
    { Deck_ID: uuidv4(), FrontText: "", BackText: "" },
  ]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const router = useRouter();

  const handleInputChange = (id: string, input: string, value: string) => {
    const updatedFormData = formData.map((item) =>
      item.Deck_ID === id ? { ...item, [input]: value } : item
    );
    setFormData(updatedFormData);
  };

  const handleAddRow = () => {
    const newId = uuidv4();
    setFormData([...formData, { Deck_ID: newId, FrontText: "", BackText: "" }]);
  };

  const handleRemoveRow = (id: string) => {
    const updatedFormData = formData.filter((item) => item.Deck_ID !== id);
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    // HACK: user_id needs to be checked and requested when the POST call is made, need to create a getUserInfo() function when user login is implemented

    console.log("handle");
    let deckPostData: deckPOST = {
      Title: title,
      Description: description,
      User_ID: "1",
    };

    let cardPostData: cardPOST[] = [];

    console.log("#############", deckPostData);

    // BUG: need to implement 400 error handling

    let id = axios
      .post("/api/decks", deckPostData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({ data }) => {
        return data.body.id;
      });

    for (let part of formData) {
      cardPostData.push({
        Deck_ID: await id,
        BackText: part.BackText,
        FrontText: part.FrontText,
      });
    }

    let searchID = (cardPostData[0].Deck_ID);

    console.log(searchID);

    console.log(`#########`);
    console.log(cardPostData);

    axios
      .post("/api/cards", cardPostData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({ data }) => {
        console.log(data.status);
      });

    router.replace(`/deck/${deckPostData.Title}?id=${searchID}`);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <Input
        isRequired
        label="Deck Title"
        type="text"
        placeholder="Deck Title"
        value={title}
        onChange={handleTitleChange}
      />
      <Input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={handleDescChange}
      />
      {formData.map((item) => (
        <div key={item.Deck_ID}>
          <input
            type="text"
            placeholder="Term"
            value={item.FrontText}
            onChange={(e) =>
              handleInputChange(item.Deck_ID, "FrontText", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Definition"
            value={item.BackText}
            onChange={(e) =>
              handleInputChange(item.Deck_ID, "BackText", e.target.value)
            }
          />
          <button onClick={() => handleRemoveRow(item.Deck_ID)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddRow}>Add Row</button>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
