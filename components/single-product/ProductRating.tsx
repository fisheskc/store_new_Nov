import { fetchProductRating } from "@/utils/actions";
import { FaStar } from "react-icons/fa";

// async function ProductRating({ productId }: { productId: string }) {
// We can use the productId in our fetchProductrating function
// From the function, we will get the values from the database
async function ProductRating({productId}: { productId: string }) {
  // We use dynamic values
  // So everytime we create the review for a product, we will calculate them
  // We want to destructure count & rating
  const {count, rating} = await fetchProductRating(productId)

  // We set up a dynamic class
  const className = `flex gap-1 items-center text-md mt-1 mb-4`;
   const countValue = `(${count}) reviews`
  return (
    <span className={className}>
      <FaStar className="w-3 h-3"/> 
      {rating} {countValue}
    </span>
  )
}

export default ProductRating