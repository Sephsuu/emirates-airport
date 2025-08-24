import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const BASE_URL = "http://localhost:3001";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatTimezone(dateString: string) {
	// Parse ISO string (works cross-browser for this format)
	const date = new Date(dateString);

	// Get today's and tomorrow's midnight
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

	// Format time (9:30 AM)
	const timeString = date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

	// Compare
	if (
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate()
	) {
		return `TODAY, ${timeString}`;
	} else if (
		date.getFullYear() === tomorrow.getFullYear() &&
		date.getMonth() === tomorrow.getMonth() &&
		date.getDate() === tomorrow.getDate()
	) {
		return `TOMORROW, ${timeString}`;
	} else {
		const dayName = date.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
		return `${dayName}, ${timeString}`;
	}
}


export function displayCurrentDateTime() {
	const d = new Date();

	// Get weekday name, month name, and parts
	const weekday = d.toLocaleString('en-US', { weekday: 'long' });
	const month = d.toLocaleString('en-US', { month: 'long' });
	const day = d.getDate();
	const year = d.getFullYear();

	// Get time with leading zeroes
	const hours = d.getHours();
	const minutes = d.getMinutes();
	const seconds = d.getSeconds();
	// Format to 2-digit
	const pad = (n: number) => String(n).padStart(2, '0');
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const displayHours = hours % 12 || 12;

	// Get timezone short name
	const tz = d.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ').pop();

	return `${weekday}, ${month} ${day}, ${year}, ${displayHours}:${pad(minutes)}:${pad(seconds)} ${ampm} ${tz}`;
}


