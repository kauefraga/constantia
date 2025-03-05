import { X } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgb(0 0 0 / 0.7) 0%, rgb(0 0 0 / 0.1) 80%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  border: 3px solid rgb(0 0 0 / 0.1);
  background-color: white;
  padding: 32px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-header h2 {
    font-weight: 500;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
    text-align: left;
  }

  form div input {
    padding: 8px;
    margin-right: 12px;
  }
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
  background: none;
  border: none;

  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    color: rgb(255 0 0 / 0.8);
  }

  &:active {
    color: rgb(255, 0, 0);
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

    onSubmit(formData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer>
      <Modal>
        <div className="modal-header">
          <h2>Registro de prática</h2>
          <CloseButton type="button" onClick={onClose}>
            <X size={32} strokeWidth={1.5} />
          </CloseButton>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Por quanto tempo você praticou? (horas)</label>
          <div>
            <input
              type="number"
              name="duration"
              onChange={handleChange}
              value={formData.duration}
              placeholder="2"
              required
              autoFocus
            />
            <PrimaryButton type="submit">Salvar</PrimaryButton>
          </div>
        </form>
      </Modal>
    </ModalContainer>
  );
}
