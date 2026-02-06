import { cn } from '@/lib/utils';
import { StarIcon } from 'lucide-react';

interface RatingProps {
  rating: number;
  size?: 'default' | 'lg';
}

const Rating = ({ rating, size }: RatingProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starIndex = index + 1;
        return (
          <StarIcon
            key={index}
            className={cn('', {
              'size-4': size === 'default' || !size,
              'size-5': size === 'lg',
              'fill-amber-400 text-yellow-400': starIndex <= rating,
              'fill-gray-300s text-gray-300': starIndex > rating,
            })}
          />
        );
      })}
    </div>
  );
};

export default Rating;
