/**
 * Converts a date into a human-readable format or calculates the number of days from the date to today.
 * @param date The date to be formatted, either as a Date object or a string.
 * @param showDaysAgo If true, returns the number of days from the date to today if it is less than the `daysAgo` parameter (default is 6 days).
 * @param daysAgo The number of days to show the date as "x days ago" (default is 6 days) if the `showDaysAgo` parameter is true (default to false) and the date is older than the specified number of days.
 * @returns The formatted date or the number of days since the date.
 */
export function formatDate({
  date,
  showDaysAgo = false,
  daysAgo = 6,
}: {
  date: Date | string;
  showDaysAgo?: boolean;
  daysAgo?: number;
}): string {
  const dateObj = new Date(date);
  const today = new Date();

  const returnDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (showDaysAgo) {
    const timeDiff = today.getTime() - dateObj.getTime();
    const elapsedDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (elapsedDays <= daysAgo) return returnDate;
    return `${elapsedDays} days ago`;
  }

  return returnDate;
}
