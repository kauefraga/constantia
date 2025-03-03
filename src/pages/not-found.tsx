import { Sprout } from "lucide-react";
import { Link } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;

  div {
    border: 1px solid rgb(0 0 0 / 0.1);
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* tailwind shadow-md */
    padding: 32px 48px;
  }

  header {
    text-align: center;
  }

  main {
    max-width: 360px;
  }
`;

export function NotFound() {
  return (
    <Container>
      <div>
        <header>
          <Sprout id="logo" size={56} strokeWidth={1.5} color="#6A994E" />
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
