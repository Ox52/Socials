
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(date: Date | string): string {
  try {
    return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
  } catch (e) {
    return "a moment ago";
  }
}
