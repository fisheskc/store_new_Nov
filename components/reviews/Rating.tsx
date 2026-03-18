import { FaStar, FaRegStar } from "react-icons/fa"

// In this card rating component, we will provide this value 
function Rating({rating}:{rating:number}) {
  // We want to iterate over & then based on this rating.
  // We either return true or false
  // We use five since those are our options
  // rating = 2
  // First item will be one
  // 1 less or equal to 2, 1 <= 2, true
  // 2 less or equal to 2, 1 <= 2, true
  // 3 less or equal to 2, 1 <= 2, false
  // 4 less or equal to 2, 1 <= 2, false
  // 5 less or equal to 2, 1 <= 2, false
  // We will have five items, since the length is five, & the first two are going to be true, 
  // & the rest of them are going to be false. As a result, if the value is true, we will return a star,
  // & if not, we will return the empty star.
  const stars = Array.from({length:5}, (_,i) =>i+1 <= rating)
  // We are checking the value, & if it is true, we will use FaStar
  // If the text is more than 130, we will have the show more button & we can click on it,
  // & then we display the entire text
  return (
    <div className="flex items-center gap-x-1">{stars.map((isFilled, i) => {
      const className = `w-3 h-3 ${isFilled?'text-primary':'text-grey-400'}`
      return isFilled ? (<FaStar className={className} key ={i} />) : ( <FaRegStar className={className} key ={i} />)
    })}
  </div>
  )
}

export default Rating