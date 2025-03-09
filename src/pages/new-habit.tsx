import { Sprout } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import styled from "styled-components";
import { Frequency, type User, useUserStore } from "../stores/user.store";
import { Heading, Text, TextField, RadioGroup, Button } from "@radix-ui/themes";

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 1280px;
  height: 100dvh;
  margin: auto;
  padding: 16px;
  gap: 48px;

  #left,
  #right {
    width: 100%;
  }

  #right {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    height: 70%;

    background: rgb(0, 0, 0);
    background: linear-gradient(
      120deg,
      rgb(0, 0, 0) 0%,
      rgb(106, 153, 78) 100%
    );
    color: white;
    padding: 32px;
    border-radius: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    height: auto;

    #right {
      height: fit-content;
    }
  }
`;

const Form = styled.form`
  margin-top: 32px;

  #frequency {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .form-field {
    margin-top: 32px;
  }

  input[type="text"] {
    border: 1px solid rgb(0 0 0 / 0.4);
    border-radius: 4px;
    transition-property: border-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  input:hover {
    border-color: rgb(0 0 0 / 0.7);
  }

  #save-button {
    font-size: 16px;
    background-color: #6a994e;
    color: white;
    border: 1px solid #386641;
    border-radius: 4px;
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
  }
`;

export function NewHabit() {
  const navigate = useNavigate();
  const { user: existingUser, createUser } = useUserStore();

  useEffect(() => {
    if (existingUser.habit) {
      navigate("/tracker");
    }
  }, [existingUser.habit, navigate]);

  const [user, setUser] = useState<User>({
    name: "",
    habit: "",
    frequency: "daily",
    createdAt: new Date(),
  });

  function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createUser(user);
    setUser({
      name: "",
      habit: "",
      frequency: "daily",
      createdAt: new Date(),
    });
    event.currentTarget.reset();

    navigate("/tracker");
  }

  return (
    <Container>
      <main id="left">
        <Heading as="h2">Novo hábito</Heading>

        <Form onSubmit={handleForm}>
          <div className="form-field">
            <Text as="p">Informe o hábito que você deseja praticar.</Text>

            <TextField.Root
              type="text"
              id="habit"
              size="3"
              mt="3"
              placeholder="Ler livros..."
              onChange={(e) => setUser({ ...user, habit: e.target.value })}
              required
            />
          </div>

          <div id="frequency" className="form-field">
            <Text as="p">
              Qual é a frequência com que você deseja praticar?
            </Text>

            <RadioGroup.Root
              name="frequency"
              defaultValue="daily"
              style={{ gap: "12px" }}
              color="grass"
              onValueChange={(value) =>
                setUser({
                  ...user,
                  frequency: value as Frequency,
                })
              }
              required
            >
              <RadioGroup.Item className="radio" value="daily">
                Todo dia
              </RadioGroup.Item>
              <RadioGroup.Item className="radio" value="weekly">
                Uma vez por semana
              </RadioGroup.Item>
              <RadioGroup.Item className="radio" value="monthly">
                Uma vez por mês
              </RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div className="form-field">
            <Text as="p">Qual é o seu nome? (opcional)</Text>

            <TextField.Root
              type="text"
              id="username"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="João"
              size="3"
              mt="3"
            />
          </div>

          <Button
            size="3"
            id="save-button"
            className="form-field"
            style={{ padding: "0 24px" }}
          >
            Salvar
          </Button>
        </Form>
      </main>

      <Link to="/" style={{ textDecoration: "none" }} id="right">
        <Sprout id="logo" size={56} strokeWidth={1.5} color="#6A994E" />
        <h1>Constantia</h1>
      </Link>
    </Container>
  );
}
