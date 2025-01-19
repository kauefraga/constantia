import { Sprout } from "lucide-react";
import { Link } from "react-router";
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

export function NotFound() {
  return (
    <Container>
      <div>
        <header>
          <Sprout id="logo" size={42} strokeWidth={1.5} color="green" />
        </header>

        <main>
          <p>
            <span className="bold">404 - Página não encontrada</span>. A página
            que você está procurando não existe.
          </p>
          <p>
            <Link to="/">Voltar para a página inicial</Link>
          </p>
        </main>
      </div>
    </Container>
  );
}
