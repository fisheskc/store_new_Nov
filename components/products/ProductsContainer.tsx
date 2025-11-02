import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator'
import { fetchAllProducts } from '@/utils/actions';
import Link from 'next/link';

// We have the props layout & search
// At this point we will have some kind of value, therefore we do not need to set them up as optional
async function ProductsContainer({layout,search}:
  {layout:string,
  search:string}) {
  const products = await fetchAllProducts({search})
  // We count the amount of products
  // We will display the total product
  const totalProducts = products.length
  // It is not equal to an empty string
  // We will setup one value if it is equal to empty string
  // We will setup the entire search term equal to an empty string
  // We construct the value if there is something in the search
  // We want to use and (&search), because we want to combine the layout & we will set it equal to the search value
  // We have the search term in place 
  const searchTerm = search ? `&search=${search}`: '';
  // We use the header, this is where we display the total product as well, as well as the buttons, which are actually going to be links.
  // We will iterate over & depending on a value for the layout, we are either going to display the products grid or a product list
  // {totalProducts === 0} - We will check if its is equal to zero, so if we have no product
  // We want to display the heading five
  // If not, then we will display either a products grid or a products list
  // layout === 'grid', if it is, we are going to render product grid & we will pass the product
  // if not then we will render the product list
  // ProductsList will also have the product prop
  return (
    <>
      {/* HEADER */}
      <section>
          <div className='flex justify-between items-center'>
            <h4 className='font-medium text-lg'>
              {totalProducts} product{totalProducts > 1 && 's'}
            </h4>
            <div className='flex gap-x-4'>
              <Button variant={layout === 'grid' ? 'default' : 'ghost'} size='icon' asChild>
                  <Link href={`/products?layout=grid${searchTerm}`}>
                    <LuLayoutGrid />
                  </Link>
              </Button>
              <Button variant={layout === 'list' ? 'default':'ghost'} size='icon' asChild>
                  <Link href={`/products?layout=list${searchTerm}`}>
                    <LuList />
                  </Link>
              </Button>
            </div>
          </div>
          <Separator className='mt-4' />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? <h5 className='text-2x1 mt-16'>
          Sorry, no products matched your search...
        </h5>: layout === 'grid' ? ( <ProductsGrid products={products}/>):(<ProductsList products={products} />)}
      </div>
    </>
  )
}

export default ProductsContainer
