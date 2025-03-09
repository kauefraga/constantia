import { Dialog, Button, Flex, TextField, Text } from "@radix-ui/themes";
import { useState } from "react";
import styled from "styled-components";

const OpenModalButton = styled(Button)`
  padding: 8px 24px;
  background-color: #6a994e;
  color: white;
  border: 1px solid #386641;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    background-color: rgb(0 0 0 / 0.9);
    border: 1px solid rgb(0 0 0);
  }

  &:active {
    background-color: rgb(255 255 255 / 0.9);
    color: rgb(0 0 0);
    border: 1px solid rgb(0 0 0);
  }
`;

interface NewPracticeModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: (formData: { duration: number }) => void;
}

export function NewPracticeModal({
  isOpen,
  onOpenChange,
  onSubmit,
}: NewPracticeModalProps) {
  const [formData, setFormData] = useState({
    duration: 0,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger style={{ marginTop: "48px" }}>
        <OpenModalButton size="3">Pratiquei hoje!</OpenModalButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px" size="4">
        <Dialog.Title>Registro de prática</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Atualize a quantidade de horas que você praticou
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Por quanto tempo você praticou? (horas)
            </Text>
            <TextField.Root
              type="number"
              placeholder="2"
              name="duration"
              onChange={handleChange}
              color="grass"
              required
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close onClick={onOpenChange}>
            <Button variant="soft" color="gray">
              Fechar
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color="grass" onClick={handleSubmit}>
              Atualizar
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
