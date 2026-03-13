import BreadCrumbs from '@/components/single-product/BreadCrumbs';
import { fetchSingleProduct } from '@/utils/actions';
// import Image from 'next/image';
import { formatCurrency } from '@/utils/format';
// import FavoriteToggleButton from '@/components/products/FavoriteToggleButton';
// import AddToCart from '@/components/single-product/AddToCart';
// import ProductRating from '@/components/single-product/ProductRating';
import { auth } from '@clerk/nextjs/server';
import ClientProductSection from './ClientProductSection';
// import ProductsGrid from '@/components/products/ProductsGrid';


// Since this is dynamic, we have access to the param in the params prop.
// The type will be the params & we will set it equal to an object
async function SingleProductPage({ params }: { params: Promise<{ id: string }> }) {
    const  {id } = await params;
    // This is what we will pass into the fetch single product
    const product = await fetchSingleProduct(id);
    const { name, image, company, description, price } = product;
    // This is a helper function
    const dollarsAmount = formatCurrency(price);
    // The BreadCrumbs are looking for the name
    const { userId } = await auth();
  return (
    <section>
        <BreadCrumbs name={product.name} />

        <ClientProductSection
           id={product.id}
           name={product.name}
           image={product.image}
           company={product.company}
           description={product.description}
           dollarsAmount={dollarsAmount}
           productId={product.id}

        />

    </section>
  )
}

export default SingleProductPage;