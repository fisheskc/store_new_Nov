import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Rating from './Rating';
import Comment from './Comment';
import Image from 'next/image';

// This is from the productReviews component
type ReviewCardProps = {
  reviewInfo: {
    comment: string;
    rating: number;
    name: string;
    image: string;
  };
  // The children is optional
  children?: React.ReactNode;
};

// We display the card component
// We will set it to relative, since the delete button, our children are going to be absolute
// We want to position them in a specific spot.
function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
  return (
    <Card className='relative'>
      <CardHeader>
        <div className='flex items-center'>
          <Image
            src={reviewInfo.image}
            alt={reviewInfo.name}
            width={48}
            height={48}
            className='w-12 h-12 rounded-full object-cover' />
          <div className='ml-4'>
            <h3 className='text-sm font-bold capitalize mb-1'>
              {reviewInfo.name}
            </h3>
            <Rating rating={reviewInfo.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewInfo.comment} />
      </CardContent>
      <div className='absolute top-3 right-3'>{children}</div>
    </Card>
  );
}
export default ReviewCard;