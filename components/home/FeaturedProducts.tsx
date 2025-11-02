import { fetchFeaturedProducts } from '@/utils/actions';
import EmptyList from '../global/EmptyList';
import SectionTitle from '../global/SectionTitle';
import ProductsGrid from '../products/ProductsGrid';

async function FeaturedProducts() {
   const products = await fetchFeaturedProducts();
  // We invoke this, but potentially there might not be a product
  // We need to set up this check where the product length is less than one 
  // or if it is equal to zero
  // We want to return our empty list component
  // We will display the EmptyList as the default value
  if(products.length === 0) return <EmptyList />
  
  return (
    <section className='pt-24'>
      <SectionTitle text='featured products' />
      <ProductsGrid products={products} />
    </section>
  )
}

export default FeaturedProducts;
