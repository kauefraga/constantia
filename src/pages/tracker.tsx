import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Shrub } from "lucide-react";
import confetti from "canvas-confetti";

import { Practice, useStreakStore } from "../stores/streak.store";
import { useUserStore } from "../stores/user.store";
import {
  filterPracticesByFrequency,
  isSameDay,
} from "../utils/practice-validation";
import { NewPracticeModal } from "../components/new-practice-modal";
import { v7 } from "uuid";
import { Heading, Text } from "@radix-ui/themes";

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
    background: linear-gradient(
      320deg in oklch,
      hsl(98deg 32% 45%) 0%,
      hsl(55deg 77% 51%) 60%
    );

    background-clip: text;
    color: transparent;
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
  const { streak, updateStreak, updatePractice, resetStreak } =
    useStreakStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    const lastPractice = streak.practices[streak.practices.length - 1];

    if (!lastPractice) {
      resetStreak();
    }

    if (lastPractice && !isSameDay(new Date(), new Date(lastPractice.date))) {
      resetStreak();
    }

    if (practicesInCurrentPeriod.length > 0) {
      updatePractice(duration);
      confetti({
        particleCount: 50,
        spread: 60,
      });
      setIsDialogOpen(false);
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
    setIsDialogOpen(false);
  };

  return (
    <TrackerContainer>
      <main>
        <div>
          <div>
            <Link to="/">
              <Shrub size={240} color="#6A994E" />
            </Link>
            <Heading size="8">
              Você está praticando <span>{user.habit}</span> há {streak.count}{" "}
              {streak.count === 1 ? "dia" : "dias"}
            </Heading>
          </div>

          <NewPracticeModal
            isOpen={isDialogOpen}
            onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
            onSubmit={handleFormSubmit}
          />
        </div>

        <DetailedSection>
          <div>
            <Text as="p">Praticando desde {since}</Text>
            <Text as="p">Você já praticou mais de {hoursPracticed} horas</Text>
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
              titleForValue={(value) => {
                const practice = value as Practice;

                return practice
                  ? `${practice.duration} horas praticadas - ${new Date(
                      practice.date
                    ).toLocaleDateString()}`
                  : "Nenhuma prática registrada";
              }}
            />
          </div>
        </DetailedSection>
      </main>
    </TrackerContainer>
  );
}
