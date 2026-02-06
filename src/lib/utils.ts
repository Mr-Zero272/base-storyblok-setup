import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isWhiteBackground = (color: string) => {
  const whiteColors = ['#FFFFFF', '#FFF', '#fff', '#ffffff', 'rgb(255, 255, 255)', 'rgba(255, 255, 255, 1)'];
  return whiteColors.includes(color.trim().toUpperCase());
};
