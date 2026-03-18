import BreadCrumbs from '@/components/single-product/BreadCrumbs';
import { fetchSingleProduct } from '@/utils/actions';
// import Image from 'next/image';
import { formatCurrency } from '@/utils/format';
// import FavoriteToggleButton from '@/components/products/FavoriteToggleButton';
// import AddToCart from '@/components/single-product/AddToCart';
// import ProductRating from '@/components/single-product/ProductRating';
import { auth } from '@clerk/nextjs/server';
import ClientProductSection from './ClientProductSection';
import { findExistingReview } from '@/utils/actions'
import SubmitReview from '@/components/reviews/SubmitReview';
// import ProductsGrid from '@/components/products/ProductsGrid';


// Since this is dynamic, we have access to the param in the params prop.
// The type will be the params & we will set it equal to an object
async function SingleProductPage({ params }: { params: Promise<{ id: string }> }) {
    const {id } = await params;
    // This is what we will pass into the fetch single product
    const product = await fetchSingleProduct(id);
    const { name, image, company, description, price } = product;
    // This is a helper function
    const dollarsAmount = formatCurrency(price);
    // The BreadCrumbs are looking for the name
    const { userId } = await auth();
    // If the user has not logged in, then it does not matter
    // We do not check for the review & we set it equal to the opposite
    // We are looking for the value of null. If it is not going to be null,
    // it means that there is already a review. In that case, we want to hide the button
    // This is only going to run if there is a user & we are actually looking for the null
    // If it is null, then this condition is going to pass.
    // If not, if there is something in there, then we are going to hide the button
    // If is false, it means either the user has not logged in or the user already left the your review
    const reviewDoesNotExist = userId && !(await findExistingReview(userId, product.id))
  return (
    <section>
        <BreadCrumbs name={product.name} />
        {reviewDoesNotExist && <SubmitReview productId={(await params).id} />}
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