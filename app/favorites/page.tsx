//Your page is being treated as a static page, but it needs to be dynamic.
// Next.js  tries to statically generate it → your user-dependent function explodes → build fails.
// The fix: force the page to be dynamic
// This tells Next.js: “Do NOT try to pre-render this page at build time. Render it on every request.”

export const dynamic = 'force-dynamic';

import SectionTitle from '@/components/global/SectionTitle';
import ProductsGrid from '@/components/products/ProductsGrid';
import {  fetchUserFavorites } from '@/utils/actions';

import type { Product } from "@prisma/client";



async function FavoritesPage() {
  const favorites = await fetchUserFavorites()
  // Since product is sitting in the producct property, we want to use map & use the product properties
  if(favorites.length ===0){
    return <SectionTitle text='You have no favourites yet' />
  }
  
    return (
    <div>
      <SectionTitle text='Favourites' />
      <ProductsGrid products={favorites.map((favorite) =>  favorite.product )} /> 
      {/* <ProductsGrid products={favorites.map((favorite: Product) => {console.log(favorite); return favorite.product} )} />  */}

    </div>
  )
}

export default FavoritesPage