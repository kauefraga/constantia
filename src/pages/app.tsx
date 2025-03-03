import { CheckCheckIcon, TargetIcon, TreeDeciduousIcon } from "lucide-react";
import { Link } from "react-router";
import styled from "styled-components";
import { FeatureCard } from "../components/feature-card";

// primary green: #6A994E

const Container = styled.div`
  max-width: 1280px;
  margin: auto;
  padding: 8px;
  text-align: center;
  margin-top: 48px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 32px;

  * {
    margin: 0;
  }
`;

const FeaturesContainer = styled.section`
  display: flex;
  min-height: 320px;
  justify-content: center;
  gap: 24px;
  margin-top: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const GetStartedLink = styled(Link)`
  display: inline-block;
  text-decoration: none;

  padding: 16px 24px;
  background-color: #6a994e;
  color: white;
  border: 1px solid darkgreen;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  margin-top: 48px;
  font-weight: bold;

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

export function App() {
  return (
    <Container>
      <Header>
        <h1>Constantia</h1>

        <p style={{ maxWidth: 480, margin: "auto" }}>
          Quer alcançar o <span className="bold">próximo nível</span> em uma
          prática? Você precisa{" "}
          <span className="underline">praticar constantemente a tarefa</span> e
          o Constantia vai ajudar você a{" "}
          <span className="underline">criar um hábito</span>, além de{" "}
          <span className="underline">acompanhar seus esforços</span>.
        </p>
      </Header>

      <main>
        <FeaturesContainer>
          <FeatureCard title="Foco" icon={<TargetIcon color="#6A994E" />}>
            Usando Constantia, você se dedica a um hábito de cada vez, tornando
            a prática mais fácil de incorporar
          </FeatureCard>

          <FeatureCard
            title="Constância"
            icon={<CheckCheckIcon color="#6A994E" />}
          >
            Acompanhe seu progresso de perto, definindo a frequência das
            práticas e visualizando sua constância
          </FeatureCard>

          <FeatureCard
            title="Transformação"
            icon={<TreeDeciduousIcon color="#6A994E" />}
          >
            Sua mudança de hábitos se torna fácil de entender e simples,
            convertendo esforço diário em resultados reais
          </FeatureCard>
        </FeaturesContainer>

        <GetStartedLink to="/new">Comece a sua jornada</GetStartedLink>
      </main>
    </Container>
  );
}
