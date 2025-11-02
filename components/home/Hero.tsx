import Link from "next/link"
import { Button } from "../ui/button"
import HeroCarousel from "./HeroCarousel"

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2x1 font-bold text-4x1 tracking-tight sm:text-6x1">
          We are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, hic quisquam? Itaque cum earum ipsa amet labore eum molestiae cumque.
        </p>
        <Button asChild size='lg' className="mt-10">
          <Link href='/products'>
            Our Products
          </Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  )
}

export default Hero
