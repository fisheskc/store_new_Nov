
import { auth } from '@clerk/nextjs/server';
import { CardSignInButton } from '../form/Buttons';
import { fetchFavoriteId} from '@/utils/actions';
import FavoriteToggleForm from './FavoriteToggleForm';

// The type will be equal to string
async function FavoriteToggleButton({productId}: { productId: string }) {
  // const favoriteId = await fetchFavoriteId({ productId });
  // We will use auth from the clerk, because we are only interested in the userId
  const {userId} = await auth()
  if(!userId) {
    return <CardSignInButton />;
  }
  // We only run this code if the user is signed in
  // If there is no user, we will not go past this condition
  // We check if there is a favouriteId, if it is, it will be a string and if not, it will be null.
  const favoriteId = await fetchFavoriteId({productId}) 
  // TypeScript is going to complain, because we have not set up the FavoriteToggleForm yet
  return (
     <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />
  )
}
export default FavoriteToggleButton;
