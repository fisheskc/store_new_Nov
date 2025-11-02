import { Button } from "../ui/button"

// We will be looking for a specific prop
// productId is going to be equal to a string
// function AddToCart({productId}:{productId:string}) {
function AddToCart({productId}:{productId:string}) {
  return (
    <Button className="capitalize mt-8" size='lg'>
      Add to cart
    </Button>
  )
}

export default AddToCart
