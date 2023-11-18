"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import axios from "axios";
import { deckGET } from "../helpers/types";
import { Card, CardBody, Spinner } from "@nextui-org/react";


export default function App() {
  // TODO: filter sets with autocomplete nextui object
  const [data, setData] = useState<deckGET[]>();
  
  useEffect(() => {
    axios
      .get("/api/decks")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  // TODO: spaces need to be dealth with

  return (
    <>
      <div className={styles.main}>
        <div className={styles.center}>
          <h1 className={styles.header}>Your Study Decks</h1>
        </div>
        {data ? (
          <div className={styles.grid}>
            {data.map((item) => (
              <Card key={item.id} className={styles.card}>
                <Link href={`deck/${item.Title}?id=${item.id}`} rel="noopener noreferrer">
                  <CardBody>
                    <h2 key={item.id}>
                      {item.Title} <span>-&gt;</span>
                    </h2>
                  </CardBody>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Spinner color="primary" label="Loading" />
        )}
      </div>
    </>
  );
}
