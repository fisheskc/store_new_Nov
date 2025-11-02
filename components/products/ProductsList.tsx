import { formatCurrency } from '@/utils/format';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@prisma/client';
import Image from 'next/image';
import FavoriteToggleButton from './FavoriteToggleButton';

// The props will be products & that is equal to products & the type is going to be equal to product
// & it is going to be an array
// We iterate over a product array & each & every item we will reference as a product 
function ProductsList({products}:{products:Product[]}) {
  return (
    <div className='mt-12 grid gap-y-8'>
      {products.map((product) => {
        // We destructure & we are looking for name & price
        // "group" is important because we will hover effects
        // "relative" is important because we do not want to navigate to product details when we click on it
        // FavoriteToggleButton
        // When we click on the FavoriteToggleButton, we actually want to invoke the favourite logic
        const {name, price, image, company} = product
        const dollarsAmount = formatCurrency(price);
        const productId = product.id
        return (
          <article key={productId} className='group relative'>
          <Link href={`/products/${productId}`}>
            <Card className='transform group-hover:shadow-xl transition-shadow duration-500'>
                <CardContent className='p-8 gap-y-4 grid md:grid-cols-3'>
                  <div className='relative h-64 md:h-48 md:w-48'>
                      <Image
                        src={image}
                        alt={name}
                        fill sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw 33vw'
                        priority className='w-full rounded object-cover' />
                  </div>
                   <div>
                      <h2 className='text-xl font-semibold capitalize'>
                        {name}
                    </h2>
                    <h4 className='text-muted-foreground'>
                      {company}
                    </h4>
                  </div>
                  <p className='text-muted-foreground text-lg md:ml-auto'>
                    {dollarsAmount}
                  </p>
                </CardContent>
            </Card>
          </Link>
          <div className='absolute bottom-8 right-8 z-5'>
            <FavoriteToggleButton productId={productId} />
          </div>
        </article>
        )
      })}
    </div>
  )
}

export default ProductsList
