"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { cardPOST, deckPOST } from "../helpers/types";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Divider, Input } from "@nextui-org/react";

export default function App() {
  const [formData, setFormData] = useState<cardPOST[]>([
    { Deck_ID: uuidv4(), FrontText: "", BackText: "" },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string>("");
  const [deckID, setDeckID] = useState("");

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
    let deckPostData: deckPOST = {
      Title: title,
      Description: description,
      User_ID: "1",
    };

    let cardPostData: cardPOST[] = [];

    // BUG: need to implement 400 error handling

    let id = axios
      .post("/api/decks", deckPostData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({ data }) => {
        setDeckID(data.body.id);
        console.log(deckID);
        return data.body.id;
      });
    for (let part of formData) {
      cardPostData.push({
        Deck_ID: await id,
        BackText: part.BackText,
        FrontText: part.FrontText,
      });
    }

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

    // useRouter().replace(`/deck/${deckPostData.Title}?id=${id}`);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <form>
      <div className="flex flex-wrap md:flex-nowrap gap-4 m-5">
        <Input
          isRequired
          color="primary"
          type="text"
          placeholder="My Amazing Deck"
          label="Deck Title"
          value={title}
          onChange={handleTitleChange}
        />
        <Input
          type="text"
          color="secondary"
          placeholder="Description (optional)"
          value={description}
          onChange={handleDescChange}
        />
      </div>
      <Divider />
      <div>
        {formData.map((item, index) => (
          <div className="flex items-center flex-wrap md:flex-nowrap gap-4 m-3" key={item.Deck_ID}>
            <h1 className="font-bold">{index+1}.</h1>
            <Input
              isRequired
              type="text"
              placeholder="Term"
              value={item.FrontText}
              onChange={(e) =>
                handleInputChange(item.Deck_ID, "FrontText", e.target.value)
              }
            />
            <Input
              isRequired
              type="text"
              placeholder="Definition"
              value={item.BackText}
              onChange={(e) =>
                handleInputChange(item.Deck_ID, "BackText", e.target.value)
              }
            />
            <Button
              color="danger"
              onClick={() => handleRemoveRow(item.Deck_ID)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-center m-3">
        <Button className="m-2" color="success" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Button className="m-2" color="secondary" onClick={handleAddRow}>
          Add Card
        </Button>
      </div>
      </form>
    </>
  );
}
