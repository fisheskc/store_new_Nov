import ProductsContainer from '@/components/products/ProductsContainer';

type ProductsPageProps = {
  searchParams: Promise<{layout?: string; search?: string}>
}

// function ProductsPage({searchParams,}:{searchParams: { layout?: string; search?: string };
async function ProductsPage({ searchParams}: ProductsPageProps) {
 
// async function ProductsPage({searchParams}:{ searchParams: Promise <{ layout?: string; search?: string }>;}) {



  // const params = await searchParams
  // if it is not present, we have a default value
  console.log("This is searchParams")
  const params = await searchParams;
  console.log(params)
 
  // ?? the variable can be null or undefined
  const layout = params?.layout ?? 'grid';
  const search = params?.search ?? '';
  console.log("This is layout")
  console.log(layout)
  console.log("This is search")
  console.log(search)
  // In here we do want access the search params
  // We want to pass both searchParams layout & search as props
  return (
    <>
    <ProductsContainer layout={layout} search={search} />
    </>
  )
}

export default ProductsPage
