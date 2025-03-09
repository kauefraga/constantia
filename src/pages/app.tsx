import {
  CheckCheckIcon,
  Sprout,
  TargetIcon,
  TreeDeciduousIcon,
} from "lucide-react";
import { Link } from "react-router";
import styled from "styled-components";
import { FeatureCard } from "../components/feature-card";
import { Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";

// primary green: #6A994E

const GetStartedLink = styled(Link)`
  display: inline-block;
  text-decoration: none;

  padding: 16px 24px;
  background-color: #6a994e;
  color: white;
  border: 1px solid #386641;
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
    <Flex
      direction="column"
      align="center"
      mt="9"
      style={{ textAlign: "center" }}
    >
      <Flex direction="column" gap="5" align="center">
        <Link to="/">
          <Sprout id="logo" size={56} strokeWidth={1.5} color="#6A994E" />
        </Link>

        <Heading size="8">Constantia</Heading>

        <Container size="1">
          <Text as="p">
            Quer alcançar o <span className="bold">próximo nível</span> em uma
            prática? Você precisa{" "}
            <span className="underline">praticar constantemente a tarefa</span>{" "}
            e o Constantia vai ajudar você a{" "}
            <span className="underline">criar um hábito</span>, além de{" "}
            <span className="underline">acompanhar seus esforços</span>.
          </Text>
        </Container>
      </Flex>

      <main style={{ marginTop: "48px" }}>
        <Grid gap="5" columns={{ xs: "1", md: "3" }} rows="1">
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
        </Grid>

        <GetStartedLink to="/new">Comece a sua jornada</GetStartedLink>
      </main>
    </Flex>
  );
}
