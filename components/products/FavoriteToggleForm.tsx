'use client';

// We do want to use this Pathname hook, because we want to invoke this in multiplEe places
// We will revalidate the path, as we need to know which page we are currently at. 
import { usePathname } from 'next/navigation';
import FormContainer from '../form/FormContainer';
import { toggleFavoriteAction } from '@/utils/actions';
// A  CardSubmitButton, this is what we are going to pass into the form
import { CardSubmitButton } from '../form/Buttons';

// This is what we are going to pass into the form
// We do have the logic where we render the icon based on the value of favoriteId
type FavoriteToggleFormProps = {
  productId: string;
  // We will pass this value into the cardSubmitButton
  favoriteId: string | null;
};
// We need to set up both of these props, productId & favoriteId
function FavoriteToggleForm({productId, favoriteId}:FavoriteToggleFormProps) {
  const pathname = usePathname();
  // We use the bind option, we want to pass in three things productid, favouriteId, as well as the pathname
  // into the ToggleFavoriteAction
  const toggleAction = toggleFavoriteAction.bind(null, {productId, favoriteId, pathname});
  // We render the FormContainer 
  // We are looking for this prop, isFavorite & based on the value, we will either provide true or false
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId? true:false} />
    </FormContainer>
  )
}

export default FavoriteToggleForm
