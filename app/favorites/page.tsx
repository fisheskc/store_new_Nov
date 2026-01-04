import SectionTitle from '@/components/global/SectionTitle';
import ProductsGrid from '@/components/products/ProductsGrid';
import {  fetchUserFavorites } from '@/utils/actions';

async function FavoritesPage() {
  const favorites = await fetchUserFavorites()
  // We are not going to provide any value
  // Since product is sitting in the producct property, we want to use map & use the product properties
  if(favorites.length ===0){
    return <SectionTitle text='You have no favourites yet' />
  }
    return (
    <div>
      <SectionTitle text='Favourites' />
      <ProductsGrid products={favorites.map((favorite) => favorite.product)} /> 
    </div>
  )
}

export default FavoritesPage