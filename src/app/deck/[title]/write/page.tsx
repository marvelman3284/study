"use client";
import React, { useState, useEffect } from "react";
import { cardGET } from "@/app/helpers/types";
import {
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
import { WriteCard } from "@/app/components/write_card";

export default function App({ params }: { params: { title: string } }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState<cardGET[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [answer, setAnswer] = useState<Selection>(new Set([]));
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [question, setCurrentQuestion] = useState<JSX.Element>();

  const usedQuestions: JSX.Element[] = [];

  const searchParams = useSearchParams();

  const updateFormData = (newState: boolean) => {
    setIsCorrect(newState);
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
    <div key={card._id}>
      <WriteCard updateState={updateFormData} card={card} answer="def" />
    </div>
  ));

  useEffect(() => {
    if (dataMap !== null) {
      setRandomQuestion();
    }
  }, [data]);

  useEffect(() => {
    console.log("state changed");
    if (isCorrect) {
      setRandomQuestion();
    }
  }, [isCorrect]);

  const setRandomQuestion = () => {
    if (usedQuestions.length === dataMap.length) {
      console.log("all questions used");
      return;
    }

    let newQuestion = dataMap[Math.floor(Math.random() * dataMap.length)];
    
    while (usedQuestions.includes(newQuestion)) {
      console.log('already used')
      newQuestion = dataMap[Math.floor(Math.random() * dataMap.length)];
    }
    console.log("called");
    setCurrentQuestion(newQuestion);
    usedQuestions.push(newQuestion);
    console.log(question);
    console.log(newQuestion);
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
          <div className="flex items-center justify-center ">{question}</div>
        </div>
      ) : (
        <p>Error</p>
      )}
    </>
  );
}
