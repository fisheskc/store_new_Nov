// "use client";

// import { useTransition } from 'react';
// import { usePathname } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from '../form/Buttons';
import { fetchFavoriteId} from '@/utils/actions';
import FavoriteToggleForm from './FavoriteToggleForm';


interface Props {
  productId: string;
}

// The type will be equal to string
async function FavoriteToggleButton({productId}: Props) {
  // const pathname = usePathname();
  const {userId} = await auth()
  // const [isPending, startTransition] = useTransition();
  // We only run this code if the user is signed in
  // If there is no user, we will not go past this condition
  // We check if there is a favouriteId, if it is, it will be a string and if not, it will be null.
 if(!userId) return <CardSignInButton /> 

 const favoriteId = await fetchFavoriteId({productId})
  // const handleClick = () => {
  //   startTransition(async () => {
  //     await toggleFavoriteAction({ productId, favoriteId,  pathname })
  //   })
  // }

  // TypeScript is going to complain, because we have not set up the FavoriteToggleForm yet
  return (
    <FavoriteToggleForm productId={productId} favoriteId={favoriteId} />
  )
}
export default FavoriteToggleButton
