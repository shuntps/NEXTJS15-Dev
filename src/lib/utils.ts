import { formatDate, formatDistanceToNowStrict } from "date-fns";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string.
 * Uses clsx to handle conditional classes and twMerge to merge Tailwind CSS classes without duplication.
 *
 * @param {...ClassValue[]} inputs - Multiple class names or conditions to be combined.
 * @returns {string} - A single string with combined and merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a given date relative to the current date.
 * If the given date is within the last 24 hours, it returns a string indicating the time elapsed since that date.
 * If the given date is in the current year, it returns a short date format (e.g., "Jul 20").
 * If the given date is in a different year, it returns a full date format (e.g., "Jul 20, 2023").
 *
 * @param {Date} from - The date to be formatted.
 * @returns {string} - A string representing the relative date.
 */
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
