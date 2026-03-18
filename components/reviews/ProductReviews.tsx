import { fetchProductReviews } from "@/utils/actions";
import SectionTitle from "../global/SectionTitle";
import ReviewCard from "./ReviewCard";

async function ProductReviews({ productId }: { productId: string }) {
  // For every item, we want to display the Reviewcard
  const reviews = await fetchProductReviews(productId)
  return (
    <div className="mt-16">
      <div className="rid md:grid-cols-2 gap-8 my-8">
   <SectionTitle text='product reviews' />
   {reviews.map((review) => {
    const {id, comment, rating, authorImageUrl, authorName } = review
    const reviewInfo = {id, comment, rating, image:authorImageUrl, name: authorName}
   
    return <ReviewCard key={review.id} reviewInfo={reviewInfo} />
    })}
     </div>
    </div>
  )
}

export default ProductReviews;