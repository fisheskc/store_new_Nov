// Favorite.tsx is a server component

// import React from 'react';
import { auth } from "@clerk/nextjs/server";
import { fetchFavoriteId} from '@/utils/actions';
import { CardSignInButton } from '@/components/form/Buttons';
import FavoriteToggleForm from './FavoriteToggleForm';

type FavoriteProps = {
  productId: string;
};


export default async function Favorite({ productId }: FavoriteProps) {
    // const favoriteId = await fetchFavoriteId({ productId });
  // We will use auth from the clerk, because we are only interested in the userId
  const { userId } = await auth();
   
  // If user is not logged in → show sign-in heart button
  if(!userId) {
    return <CardSignInButton />;
  }
  // If logged in → fetch favoriteId
  const favoriteId = await fetchFavoriteId({productId});
  return (
    <FavoriteToggleForm favoriteId={favoriteId} productId={productId} />
  );
}
