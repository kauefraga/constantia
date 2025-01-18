import { Sprout } from "lucide-react";
import styled from "styled-components";

const Container = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;

  font-family: Inter, sans-serif;
  line-height: 1.5;

  div {
    border: 1px solid rgb(0 0 0 / 0.1);
    border-radius: 16px;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1); /* tailwind shadow-md */
    padding: 32px 48px;
  }

  header {
    text-align: center;
  }

  main {
    max-width: 360px;
  }

  #logo {
    border-radius: 50%;
    background-color: rgb(0 128 0 / 0.2);
    padding: 12px;
  }
`;

export function Waitlist() {
  return (
    <Container>
      <div>
        <header>
          <Sprout id="logo" size={42} strokeWidth={1.5} color="green" />
        </header>

        <main>
          <p>
            Sua vontade de <span className="bold">criar um novo hábito</span>{" "}
            com o Constantia foi registrada! Em breve{" "}
            <span className="underline">você poderá começar sua jornada</span>.
          </p>
        </main>
      </div>
    </Container>
  );
}
