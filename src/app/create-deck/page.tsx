"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { cardPOST, deckPOST } from "../helpers/types";
import { Input } from "@nextui-org/react";
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState<cardPOST[]>([
    { Deck_ID: uuidv4(), FrontText: "", BackText: "" },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string>("");

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
      User_ID: '1',
    };

    let cardPostData: cardPOST[] = [];
    
    console.log(deckPostData)
    let id = axios
      .post("/api/decks", deckPostData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then(({data}) => {
        console.log(data);
        console.log(data.body.id);
        return data.body.id;
      });
       for (let part of formData) {
        cardPostData.push({
          Deck_ID: await id,
          BackText : part.BackText,
          FrontText: part.FrontText
        });
      } 
      
      console.log(cardPostData);

      axios
        .post("/api/cards", cardPostData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
        .then(({data}) => {
          console.log(data.status);
        });
        
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Deck Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
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
            onChange={(e) => handleInputChange(item.Deck_ID, "FrontText", e.target.value)}
          />
          <input
            type="text"
            placeholder="Definition"
            value={item.BackText}
            onChange={(e) => handleInputChange(item.Deck_ID, "BackText", e.target.value)}
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
