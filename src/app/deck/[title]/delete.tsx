import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = () => {
    
  }

  return (
    <>
      <Button onPress={onOpen}>Delete Deck</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to delete the deck?
              </ModalHeader>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  No, take me back
                </Button>

                <Button color="danger" variant="light" onPress={handleDelete}>
                  Yes, delete this deck
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
