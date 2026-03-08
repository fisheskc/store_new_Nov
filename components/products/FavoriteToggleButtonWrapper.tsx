// sever component
import FavoriteToggleButton from "./FavoriteToggleButton";

export default function FavoriteToggleButtonWrapper({ productId }: { productId: string }) {
  return <FavoriteToggleButton productId={productId} />;
}