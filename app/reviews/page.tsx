import { deleteReviewAction, fetchProductReviewsByUser } from '@/utils/actions';
import ReviewCard from '@/components/reviews/ReviewCard';
import SectionTitle from '@/components/global/SectionTitle';
import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';

// In order to deleteReview, we will have to communicate with the database
// Instead of that delete button, we will actually have the form
// We are not going to look for the props. 
async function ReviewsPage() {
  // We will get all of the reviews left by this user
  const reviews = await fetchProductReviewsByUser()
  // If there are no reviews, we do want to return the SectionTitle with some text
  if(reviews.length === 0) {
    return <SectionTitle text='you have no reviews yet' />
    // if it is not the case, then we want to iterate over & for every item we do want to display
    // the reviewcard, in this case we will pass in the product image & product nane
    // We do want to provide the children & in there, we will set up our deleteReview
    // component.
  }
  return (
    <>
      <SectionTitle text='Your reviews' />
      <section className='grid md: grid-cols-2 gap-8 mt-4'>
        {reviews.map((review) => {
          const {comment, rating} = review
          const {name,image} = review.product
          const reviewInfo = {comment,rating, name,image}
          // Inside of this reviewCard we do have children prop
          // We have a special location for them inside our Card, &
          // therefore where we have the reviewCard, we will use the deleteReview component,

            return (
              <ReviewCard key={review.id} reviewInfo = {reviewInfo}>
                <DeleteReview reviewId={review.id} />
              </ReviewCard>
            )
        })}
      </section>
    </>
  )
}

const DeleteReview = ({reviewId}:{reviewId:string}) => {
  const deleteReview = deleteReviewAction.bind(null,{reviewId})
  // We want to display the iconButton
  return <FormContainer action={deleteReview}>
    <IconButton actionType='delete' />
  </FormContainer>
}

export default ReviewsPage