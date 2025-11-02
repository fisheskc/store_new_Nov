import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// We will have one prop, which is going to be the product name
// This is something we are going to pass from the product details page
// This is going to be our root component
// Then we have a list 
// Each item we will place in the BreasdCrumb item component
function BreadCrumbs({ name }: { name: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/' className='capitalize text-lg'>
            home
            </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href='/products' className='capitalize text-lg'>
            products
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className='capitalize text-lg'>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumbs;