import { Sprout } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { type User, useUserStore } from "../stores/user.store";

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 1280px;
  height: 100dvh;
  margin: auto;
  padding: 16px;

  #left,
  #right {
    width: 100%;
  }

  #left {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    height: 70%;
    margin-right: 72px;

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
    flex-direction: column;

    #left {
      margin-right: 0;
      height: fit-content;
      margin-bottom: 24px;
    }
  }
`;

const Form = styled.form`
  div,
  button {
    margin-top: 32px;
  }

  #frequency {
    display: flex;
    flex-direction: column;
    gap: 12px;

    * {
      margin: 0;
    }

    label {
      margin-left: 12px;
    }
  }

  input {
    margin-top: 16px;
  }

  input[type="text"] {
    width: 100%;
    padding: 12px;
    border: 1px solid rgb(0 0 0 / 0.4);
    border-radius: 4px;
    transition-property: border-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  input:hover {
    border-color: rgb(0 0 0 / 0.7);
  }

  button {
    font-size: 16px;
    padding: 12px 32px;
    background-color: #6a994e;
    color: white;

    border: 1px solid darkgreen;
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
  const createUser = useUserStore((state) => state.createUser);

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
      <div id="left">
        <Sprout id="logo" size={56} strokeWidth={1.5} color="lightgreen" />
        <h1>Constantia</h1>
      </div>

      <main id="right">
        <h2>Novo hábito</h2>

        <Form onSubmit={handleForm}>
          <div>
            <p>Informe o hábito que você deseja praticar.</p>

            <input
              type="text"
              id="habit"
              placeholder="Jogar Valorant..."
              onChange={(e) => setUser({ ...user, habit: e.target.value })}
              required
            />
          </div>

          <div id="frequency">
            <p>Qual é a frequência com que você deseja praticar?</p>

            <div>
              <input
                type="radio"
                id="daily"
                name="frequency"
                value="daily"
                onChange={() =>
                  setUser({
                    ...user,
                    frequency: "daily",
                  })
                }
                required
              />
              <label htmlFor="daily">Todo dia</label>
            </div>

            <div>
              <input
                type="radio"
                id="weekly"
                name="frequency"
                value="weekly"
                onChange={() =>
                  setUser({
                    ...user,
                    frequency: "weekly",
                  })
                }
                required
              />
              <label htmlFor="weekly">Uma vez por semana</label>
            </div>

            <div>
              <input
                type="radio"
                id="monthly"
                name="frequency"
                value="monthly"
                onChange={() =>
                  setUser({
                    ...user,
                    frequency: "monthly",
                  })
                }
                required
              />
              <label htmlFor="monthly">Uma vez por mês</label>
            </div>
          </div>

          <div>
            <p>Qual é o seu nome? (opcional)</p>
            <input
              type="text"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <button type="submit">Salvar</button>
        </Form>
      </main>
    </Container>
  );
}
