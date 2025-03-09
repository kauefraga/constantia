import type { ReactElement, ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid rgb(0 0 0 / 0.2);
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* tailwind shadow-md */
  max-width: 344px;
  padding: 64px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  * {
    margin: 0;
  }

  transition-property: border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    border: 1px solid rgb(0 0 0 / 0.8);
  }

  @media (max-width: 768px) {
    padding: 24px 4px;
  }
`;

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
