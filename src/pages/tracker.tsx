import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Shrub } from "lucide-react";
import confetti from "canvas-confetti";

import { useStreakStore } from "../stores/streak.store";
import { useUserStore } from "../stores/user.store";
import { filterPracticesByFrequency } from "../utils/practice-validation";
import { NewPracticeModal } from "../components/new-practice-modal";
import { v7 } from "uuid";

const TrackerContainer = styled.div`
  max-width: 1280px;
  margin: auto;
  padding: 8px;
  text-align: center;
  margin-top: 48px;

  h1 {
    color: #6a994e;
    max-width: 640px;
    margin: auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    text-decoration: underline;
    text-decoration-color: rgb(0 0 0 / 0.9);
  }
`;

const Button = styled.button`
  padding: 16px 24px;
  background-color: #6a994e;
  color: white;
  border: 1px solid darkgreen;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  margin-top: 24px;
  font-size: 16px;

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

const DetailedSection = styled.section`
  max-width: 800px;
  margin: 48px auto;

  div {
    margin-top: 24px;
  }
`;

export function Tracker() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const { streak, updateStreak, updatePractice } = useStreakStore();

  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    if (!user.habit) {
      navigate("/new");
    }
  }, [navigate, user.habit]);

  const since = new Date(user.createdAt).toLocaleDateString("pt-br", {
    dateStyle: "long",
  });

  const hoursPracticed = streak.practices
    .map((practice) => Number(practice.duration))
    .reduce((prev, curr) => prev + curr, 0);

  const practicesInCurrentPeriod = filterPracticesByFrequency(
    streak.practices,
    user.frequency
  );

  const handleFormSubmit = (formData: { duration: number }) => {
    const duration = Number(formData.duration);

    if (practicesInCurrentPeriod.length > 0) {
      updatePractice(duration);
      confetti({
        particleCount: 50,
        spread: 60,
      });
      handleCloseModal();
      return;
    }

    updateStreak({
      id: v7(),
      date: new Date(),
      duration,
    });
    confetti({
      particleCount: 200,
      spread: 60,
    });
    handleCloseModal();
  };

  return (
    <TrackerContainer>
      <main>
        <div>
          <div>
            <Shrub size={240} color="#6A994E" />
            <h1>
              Você está praticando <span>{user.habit}</span> há {streak.count}{" "}
              {streak.count === 1 ? "dia" : "dias"}
            </h1>
          </div>

          <Button onClick={handleOpenModal}>Pratiquei hoje!</Button>

          <NewPracticeModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleFormSubmit}
          />
        </div>

        <DetailedSection>
          <div>
            <p>Praticando desde {since}</p>
            <p>Você já praticou mais de {hoursPracticed} horas</p>
          </div>

          <div>
            <CalendarHeatmap
              monthLabels={[
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out",
                "Nov",
                "Dez",
              ]}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return "color-filled";
              }}
              startDate={new Date("2024-12-31")}
              endDate={new Date("2025-12-31")}
              values={streak.practices}
            />
          </div>
        </DetailedSection>
      </main>
    </TrackerContainer>
  );
}
