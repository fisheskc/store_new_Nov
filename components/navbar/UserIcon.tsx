// changed LuUser2 to LuUser
import { LuUser } from 'react-icons/lu';
import { currentUser } from '@clerk/nextjs/server'

// This function is going to return all of the info on the currentUser
// If the user has not logged in, remember we display that navbar in the public pages as well,
// then it is going to be null
// currentUser is either it is going to be a user type, or it is going to be null,
// it is displaced in all public pages 
// async function UserIcon() {
async function UserIcon() {


  // const {userId} = auth()

  // The current user is asynchronous, & we can get all the info on the user, but if we just want the ID for example,
  // we have some kind of functionality where we want to fetch something only based on the userID, we can use our auth function,
  // invoke it, & we will use the userId.
  
const user = await currentUser()
  // We need to use the optional training, because potientially this user might be null,
  // & we do not want to throw the error
const profileImage = user?.imageUrl

  // If it exists, we want to display it & if not we want to use the icon
  // We can use the image element tag
  // This is where the URL is going to be & this comes from the Clerk
  // Even if the user sign up with an email & does not provide the image
  // Clerk is going to provide that avatar
  // So we use the default, if the user has not signed in 

   if(profileImage) {
       return (
         <img src={profileImage} className='w-6 h-6 rounded-full object-cover' />
     )

   }

  // If the user has not logged in, we return our icon 
  return <LuUser className = 'w-6 h6 bg-primary rounded-full text-white' />

}

export default UserIcon