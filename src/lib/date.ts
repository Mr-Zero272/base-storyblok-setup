import { formatDistanceToNow } from 'date-fns';

export function formatTimeAgo(date: Date | string | number) {
  const parsedDate = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  return formatDistanceToNow(parsedDate, {
    addSuffix: true, // => "ago"
  });
}
