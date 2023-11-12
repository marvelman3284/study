'use client'
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { flashcardList } from '../helpers/types';

export default function App() {
  const [formData, setFormData] = useState<flashcardList>([{ id: uuidv4(), term: '', def: '' }]);

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
    console.log(formData[0].term);
  }

  return (
    <div>
      {formData.map((item) => (
        <div key={item.id}>
          <input
            type="text"
            placeholder="Term"
            value={item.term}
            onChange={(e) => handleInputChange(item.id, 'term', e.target.value)}
          />
          <input
            type="text"
            placeholder="Definition"
            value={item.def}
            onChange={(e) => handleInputChange(item.id, 'def', e.target.value)}
          />
          <button onClick={() => handleRemoveRow(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddRow}>Add Row</button>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};
