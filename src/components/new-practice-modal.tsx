import { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  border: 1px solid black;
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;

  form {
    margin-top: 20px;
    text-align: left;
  }

  form input {
    padding: 8px;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
`;

const PrimaryButton = styled.button`
  padding: 8px 24px;
  background-color: #6a994e;
  color: white;
  border: 1px solid darkgreen;
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

const CloseButton = styled.button`
  padding: 8px;
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    background-color: rgb(0 0 0 / 0.9);
    color: white;
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
  onClose: () => void;
  onSubmit: (formData: { duration: number }) => void;
}

export function NewPracticeModal({
  isOpen,
  onClose,
  onSubmit,
}: NewPracticeModalProps) {
  const [formData, setFormData] = useState({
    duration: 0,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // check if formData.duration is a valid number
    console.log(formData);

    onSubmit(formData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer>
      <Modal>
        <h2>Registro de prática</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Por quanto tempo você praticou? (horas)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="2"
              required
            />
          </div>

          <ModalActions>
            <CloseButton type="button" onClick={onClose}>
              Fechar
            </CloseButton>
            <PrimaryButton type="submit">Salvar</PrimaryButton>
          </ModalActions>
        </form>
      </Modal>
    </ModalContainer>
  );
}
