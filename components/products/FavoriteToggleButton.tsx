"use client";

import { useTransition } from 'react';
import { usePathname } from "next/navigation";
// import { CardSignInButton } from '../form/Buttons';
import { toggleFavoriteAction } from '@/utils/actions';
// import { fetchFavoriteId} from '@/utils/actions';
import FavoriteToggleForm from './FavoriteToggleForm';

// The type will be equal to string
function FavoriteToggleButton({productId, favoriteId}: { productId: string, favoriteId: string | null }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  // We only run this code if the user is signed in
  // If there is no user, we will not go past this condition
  // We check if there is a favouriteId, if it is, it will be a string and if not, it will be null.
 
  const handleClick = () => {
    startTransition(async () => {
      await toggleFavoriteAction({ productId, favoriteId,  pathname })
    })
  }

  // TypeScript is going to complain, because we have not set up the FavoriteToggleForm yet
  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? "..." : "❤️"}
    </button>

  )
}
export default FavoriteToggleButton
