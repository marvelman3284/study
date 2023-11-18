"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { cardGET } from "@/app/helpers/types";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
  Button,
  ButtonGroup
} from "@nextui-org/react";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";

export default function App({ params }: { params: { title: string } }) {
  const [data, setData] = useState<cardGET[]>();
  const [error, setError] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    axios
      .get(`/api/cards/${params.title}?id=${searchParams.get("id")}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
        setError(true);
      });
  }, []);

  const handleDelete = () => {
    
  }

  console.log(data);

  return (
    <div>
      {!error ? (
        <>
          <div className={styles.main}>
            <div className={styles.center}>
              <h1 className={styles.header}>{params.title.toString().replaceAll("%20", " ")}</h1>
            </div>
            <div className={styles.buttons}>
              <ButtonGroup>
                <Button color="primary"> Flashcards </Button>
                <Button color="secondary"> Write </Button>
                <Button color="warning"> Edit </Button>
                <Button color="danger" onPress={handleDelete}> Delete </Button>
              </ButtonGroup>
            </div>
            {data ? (
              <div className={styles.grid}>
                {data.map((item) => (
                  <div key={item._id}>
                    <Card className={styles.card}>
                      <CardHeader>{item.FrontText}</CardHeader>
                      <Divider />
                      <CardBody>{item.BackText}</CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <Spinner color="primary" label="Loading" />
            )}
          </div>
        </>
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}
