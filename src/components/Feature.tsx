import type { ReactElement, ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div({
  border: "1px solid rgb(0 0 0 / 0.2)",
  borderRadius: 4,
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // tailwind shadow-md
  maxWidth: 344,
  padding: "0 8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 16,
  "*": {
    margin: 0,
  },
});

interface FeatureCardProps {
  children: ReactNode;
  icon: ReactElement;
  title: string;
}

export function FeatureCard({ title, icon, children }: FeatureCardProps) {
  return (
    <Container>
      <span>{icon}</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </Container>
  );
}
