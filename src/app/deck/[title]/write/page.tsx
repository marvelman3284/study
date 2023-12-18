"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { cardGET } from "@/app/helpers/types";
import {
  Divider,
  Input,
  Card,
  CardHeader,
  CardBody,
  Spacer,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { MdSettings } from "react-icons/md";

export default function App({ params }: { params: { title: string } }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState<cardGET[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [answer, setAnswer] = useState<Selection>(new Set([]));
  const [term, setTerm] = useState<string>("");
  const [def, setDef] = useState<string>("");
  const [writeAnswer, setWriteAnswer] = useState<string>("");
  const [usedQuestions, setUsedQuestions] = useState<cardGET[]>([]);

  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRandomQuestion();
  };

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

  useEffect(() => {
    if (data.length > 0) {
      setRandomQuestion();
      setUsedQuestions([]);
    }
  }, [data]);

  const setRandomQuestion = () => {
    if (usedQuestions.length == data.length) {
      console.log("all questions used");
      return;
    } 

    let newQuestion = data[Math.floor(Math.random() * data.length)];

    while (usedQuestions.includes(newQuestion)) {
      newQuestion = data[Math.floor(Math.random() * data.length)];
    }

    setTerm(newQuestion.FrontText);
    setDef(newQuestion.BackText);
    setWriteAnswer("");

    setUsedQuestions([...usedQuestions, newQuestion]);
    console.log(usedQuestions);
  };

  return (
    <>
      {!error ? (
        <div>
          <div className="flex justify-end p-4">
            <Button isIconOnly variant="light" onPress={onOpen}>
              <MdSettings />
            </Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isDismissable={false}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Write mode settings
                    </ModalHeader>
                    <ModalBody>
                      <Select
                        label="Answer with..."
                        placeholder="Term"
                        className="max-w-xs"
                        onSelectionChange={setAnswer}
                        selectedKeys={answer}
                      >
                        <SelectItem key="1" value="Term">
                          Term
                        </SelectItem>
                        <SelectItem key="2" value="Definition">
                          Definition
                        </SelectItem>
                      </Select>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <div className="flex items-center justify-center ">
            <Card className={styles.card}>
              <CardHeader>
                {Array.from(answer)[0] === "1" ? term : def}
              </CardHeader>
              <Divider />
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    placeholder="Enter your answer..."
                    onChange={(e) => setWriteAnswer(e.target.value)}
                    value={writeAnswer}
                  />
                  <Input type="submit" value="submit" />
                </form>
                <Spacer y={1} />
              </CardBody>
            </Card>
          </div>
        </div>
      ) : (
        <p>Error</p>
      )}
    </>
  );
} // TODO: implement shadow while loading
