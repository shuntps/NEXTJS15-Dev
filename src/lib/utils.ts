import { formatDate, formatDistanceToNowStrict } from "date-fns";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(from: Date) {
  const currentDate = new Date();

  // Check if the given date is within the last 24 hours.
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    // Return the time elapsed since the given date with a suffix (e.g., "3 hours ago").
    return formatDistanceToNowStrict(from, { addSuffix: true });
  } else {
    // Check if the given date is within the current year.
    if (currentDate.getFullYear() === from.getFullYear()) {
      // Return the short date format (e.g., "Jul 20").
      return formatDate(from, "MMM d");
    } else {
      // Return the full date format with the year (e.g., "Jul 20, 2023").
      return formatDate(from, "MMM d, yyyy");
    }
  }
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    // Use "compact" notation to shorten the number (e.g., 1000 -> 1K)
    notation: "compact",
    // Set the maximum number of decimal places to 1
    maximumFractionDigits: 1,
  }).format(n);
}
