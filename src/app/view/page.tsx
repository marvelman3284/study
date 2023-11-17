"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css'
import Link from 'next/link';
import axios from "axios";
import { deckGET } from '../helpers/types';
import {Card, CardBody} from "@nextui-org/react"

export default function App() {
  const [data, setData] = useState<deckGET[]>();

  useEffect(() => {
    axios.get('/api/decks')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(`Error fetching data: ${error}`)
      });
  }, []);

  return (
    <div className={styles.main}>
      {data ? (
        <div className={styles.grid}>
          {data.map(item => (
            <Card key={item.id} className={styles.card}>
              <Link
                href={`/view/${item.id}`}
                rel="noopener noreferrer"
              >
                <CardBody>
                  <h2 key={item.id}>{item.Title}</h2>
                </CardBody>
              </Link>
            </Card>
          ))}
        </div>
        ) : (
          <p>Loading...</p>
        )
      }
    </div>
  );
}
