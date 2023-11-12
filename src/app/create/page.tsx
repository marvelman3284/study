'use client'
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { flashcardList } from '../helpers/types';
import axios from 'axios';

export default function App() {
  const [formData, setFormData] = useState<flashcardList>([{ id: uuidv4(), term: '', def: '' }]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string>("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/cards')
      .then(response => setCards(response.data))
      .catch(error => console.error(error));
    }, []);

  const handleInputChange = (id: string, input: string, value: string) => {
    const updatedFormData = formData.map((item) =>
      item.id === id ? { ...item, [input]: value } : item
    );
    setFormData(updatedFormData);
  };

  const handleAddRow = () => {
    const newId = uuidv4();
    setFormData([...formData, { id: newId, term: '', def: '' }]);
  };

  const handleRemoveRow = (id: string) => {
    const updatedFormData = formData.filter((item) => item.id !== id);
    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    console.log("Submitted");
    console.log(formData);
    createDeck(title, 0, formData, description);
  }

  const handleTitleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }

  return (
    <div>
      <h1> Card List </h1>
      <ul>
        {cards.map(card => (
          <li key={card.Flashcard_ID}>{card.FrontText}</li>
        ))}
      </ul>
    </div>
  );

  // return (
  //   <div>
  //     <input type="text" placeholder="Deck Title" value={title} onChange={handleTitleChange}/>
  //     <input type="text" placeholder="Description (optional)" value={description} onChange={handleDescChange}/>
  //     {formData.map((item) => (
  //       <div key={item.id}>
  //         <input
  //           type="text"
  //           placeholder="Term"
  //           value={item.term}
  //           onChange={(e) => handleInputChange(item.id, 'term', e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Definition"
  //           value={item.def}
  //           onChange={(e) => handleInputChange(item.id, 'def', e.target.value)}
  //         />
  //         <button onClick={() => handleRemoveRow(item.id)}>Remove</button>
  //       </div>
  //     ))}
  //     <button onClick={handleAddRow}>Add Row</button>
  //     <button type="submit" onClick={handleSubmit}>Submit</button>
  //   </div>
  // );
};
