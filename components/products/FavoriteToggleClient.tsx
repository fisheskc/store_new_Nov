// "use client";

import FavoriteToggleForm from "./FavoriteToggleForm";


interface Props {
  productId: string;
  favoriteId: string | null;
  userId: string;
}

export default async function FavoriteToggleClient({ productId, favoriteId }: Props) {
  

  return (
    <FavoriteToggleForm
      productId={productId}
      favoriteId={favoriteId}
    />
  );
}