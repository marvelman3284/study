"use client";
import React, { useState, useEffect } from "react";
import { cardGET } from "@/app/helpers/types";
import {
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
  Input,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { MdSettings } from "react-icons/md";


interface questionType {
  element: JSX.Element,
  question: string,
  answer: string
}

export default function App({ params }: { params: { title: string } }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState<cardGET[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [answer, setAnswer] = useState<Selection>(new Set([]));
  const [formData, setFormData] = useState<string>("");
  const [question, setCurrentQuestion] = useState<questionType>({
    element: <></>,
    question: "",
    answer: ""
  });

  const searchParams = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFormData(e.target.value);
    setFormData("hi");
  };

  const handleSubmit =
    (correct: string) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (formData === correct) {
        console.log("correct");
        setRandomQuestion();
      } else {
        console.log("wrong");
      }
      console.log("Form submitted with data:", formData);
    };

  useEffect(() => {
    axios
      .get(`/api/cards/${params.title}?id=${searchParams.get("id")}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
        setError(true);
      });
  }, []);


  let dataMap = data.map((card) => (
    <Card key={card._id} className={styles.card}>
      <CardHeader>
        {Array.from(answer)[0] === "1" ? card.FrontText : card.BackText}
      </CardHeader>
      <Divider />
      <CardBody>
        <form
          onSubmit={handleSubmit(
            Array.from(answer)[0] === "1" ? card.BackText : card.FrontText,
          )}
        >
          <Input
            type="text"
            placeholder="Enter your answer..."
            onChange={handleInputChange}
            value={formData}
          />
          <Spacer y={1} />
          <Input type="submit" value="Submit" />
        </form>
      </CardBody>
    </Card>
  ));

  useEffect(() => {
    if (dataMap !== null) {
      setRandomQuestion();
    }
  }, [data]);

  const setRandomQuestion = () => {
    const newQuestion = dataMap[Math.floor(Math.random() * dataMap.length)];
    console.log("called");
    setCurrentQuestion({...question, element: newQuestion});
    console.log(newQuestion);
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
            {question.element}
          </div>
        </div>
      ) : (
        <p>Error</p>
      )}
    </>
  );
}
