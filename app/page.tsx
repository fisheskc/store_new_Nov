import LoadingContainer from '@/components/global/LoadingContainer';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Hero from "@/components/home/Hero";
import  { Suspense } from 'react'

// fallback will be our loading container
function HomePage() {
  return (
    <>
     <Hero />
     <Suspense fallback = {<LoadingContainer />}>
        <FeaturedProducts />
     </Suspense>
    </>
  )
}

export default HomePage;