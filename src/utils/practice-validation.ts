import { Practice } from "../stores/streak.store";
import { Frequency } from "../stores/user.store";

export const isSameDay = (date1: Date, date2: Date) =>
  date1.getUTCDate() === date2.getUTCDate() &&
  date1.getUTCMonth() === date2.getUTCMonth() &&
  date1.getUTCFullYear() === date2.getUTCFullYear();

const isSameWeek = (date1: Date, date2: Date) => {
  const startOfWeek = new Date(date2);
  startOfWeek.setUTCDate(startOfWeek.getUTCDate() - startOfWeek.getUTCDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(endOfWeek.getUTCDate() + 6);

  return date1 >= startOfWeek && date1 <= endOfWeek;
};

const isSameMonth = (date1: Date, date2: Date) =>
  date1.getUTCMonth() === date2.getUTCMonth() &&
  date1.getUTCFullYear() === date2.getUTCFullYear();

export function filterPracticesByFrequency(
  practices: Practice[],
  frequency: Frequency
) {
  const now = new Date();

  return practices.filter((practice) => {
    const practiceDate = new Date(practice.date);

    if (frequency === "daily") {
      return isSameDay(practiceDate, now);
    }

    if (frequency === "weekly") {
      return isSameWeek(practiceDate, now);
    }

    if (frequency === "monthly") {
      return isSameMonth(practiceDate, now);
    }

    return false;
  });
}
