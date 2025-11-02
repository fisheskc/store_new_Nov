import { FaHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
// import FavoriteToggleForm from './FavoriteToggleForm';

// The type will be equal to string
function FavoriteToggleButton({productId}: { productId: string }) {
  // const favoriteId = await fetchFavoriteId({ productId });
  return (
    <Button size='icon' variant='outline' className='p-2 cursor-pointer'>
      <FaHeart />
    </Button>
  );
}
export default FavoriteToggleButton;
