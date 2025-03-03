import { useUserStore } from "../stores/user.store";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import styled from "styled-components";
import { useStreakStore } from "../stores/streak.store";
import { Shrub } from "lucide-react";
import { useNavigate } from "react-router";
import confetti from "canvas-confetti";
import { ToastContainer, toast } from "react-toastify";

const TrackerContainer = styled.div`
  max-width: 1280px;
  margin: auto;
  padding: 8px;
  text-align: center;
  margin-top: 48px;

  h1 {
    color: #6a994e;
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
  const { habit, createdAt } = useUserStore((state) => state.user);
  const { streak, updateStreak } = useStreakStore();

  if (!habit) {
    navigate("/new");
  }

  const since = new Date(createdAt).toLocaleDateString("pt-br", {
    dateStyle: "long",
  });

  const hoursPracticed = streak.practices
    .map((practice) => practice.duration)
    .reduce((prev, curr) => prev + curr, 0);

  function handleClick() {
    // check based on user.frequency
    const todaysPractices = streak.practices.filter(
      (practice) =>
        new Date(practice.date).getDate() === new Date().getUTCDate() &&
        new Date(practice.date).getUTCMonth() === new Date().getUTCMonth() &&
        new Date(practice.date).getUTCFullYear() === new Date().getUTCFullYear()
    );

    if (todaysPractices.length > 0) {
      toast("Você já praticou hoje!", { type: "error" });
      return;
    }

    updateStreak({
      date: new Date(),
      duration: 2,
    });

    confetti({
      particleCount: 150,
      spread: 60,
    });
  }

  return (
    <TrackerContainer>
      <main>
        <div>
          <div>
            <Shrub size={240} color="#6A994E" />
            <h1>
              Você está praticando <span>{habit}</span> há {streak.count}{" "}
              {streak.count === 1 ? "dia" : "dias"}
            </h1>
          </div>

          <Button onClick={handleClick}>Pratiquei hoje!</Button>
        </div>

        <DetailedSection>
          <div>
            <p>Praticando desde {since}</p>
            <p>Você já praticou mais de {hoursPracticed} horas</p>
          </div>

          <div>
            <CalendarHeatmap
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
      <ToastContainer limit={1} />
    </TrackerContainer>
  );
}
