// "use client";
import FavoriteToggleButtonWrapper from "@/components/products/FavoriteToggleButtonWrapper";

import Image from 'next/image';
// import { formatCurrency } from '@/utils/format';
import AddToCart from '@/components/single-product/AddToCart';
import ProductRating from '@/components/single-product/ProductRating';
// import { auth } from '@clerk/nextjs/server';
import ShareButton from '@/components/single-product/ShareButton';

interface ClientProductSectionProps {
  id: string;
  name: string;
  image: string;
  company: string;
  description: string;
  dollarsAmount: string;
}
// We render the share button here
export default function ClientProductSection({
  id,
  name,
  image,
  company,
  description,
  dollarsAmount,
}: ClientProductSectionProps) {
  return (
    <section>
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        <div className="relative h-full">
            <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
                priority
                className="w-full rounded object-cover"
            />
        </div>
    </div>
      <div>
        <div className="flex gap-x-8 items-center">
          <h1 className="capitalize text-3xl font-bold">{name}</h1>
          <div className="flex items-center gap-x-2">
             <FavoriteToggleButtonWrapper productId={id} />
             <ShareButton name={name} productId={id} />
          </div>
        </div>

        <ProductRating productId={id} />
        <h4 className="text-xl mt-2">{company}</h4>
        <p className="mt-3 text-md bg-muted inline-block p-2 rounded">{dollarsAmount}</p>
        <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
        <AddToCart productId={id} />
      </div>
    </section>
  );
}