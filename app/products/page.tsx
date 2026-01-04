import EmptyList from '@/components/global/EmptyList';
import { fetchAdminProducts, deleteProductAction } from '@/utils/actions';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IconButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';


async function AdminProductsPage() {
  // We reference products as items
  const items = await fetchAdminProducts()
 if(items.length === 0) return <EmptyList />
  // We want to start with our root component, which is going to be a table
  // We are going to display how many products we have in total
  // We want to check the items length. We then have a table header
  // <Link href={`/products/${productId}`} - the href is going to e dynamic
  return (
    <section>
      <Table>
        <TableCaption className='capitalize'>
          total products : {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { id: productId, name, company, price } = item;
            return (
              <TableRow key={productId}> 
                <TableCell>
                  <Link
                    href={`/products/${productId}`}
                    className='underline text-muted-foreground tracking-wide capitalize'
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/admin/products/${productId}/edit`}>
                     <IconButton actionType='edit' />
                  </Link>
                <DeleteProduct productId={productId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}


function DeleteProduct({productId}:{productId:string}) {
//   // We construct a new actioh by running bind on our delete product action
//   // We will use the bind in order to pass in the produst ID down to our delete product action. We have two options, we can use the input hidden, as we are just passing in the ID. We will use bind
//   // We are passing in our prevState
  const deleteProduct = deleteProductAction.bind(null, { productId });
  return <FormContainer action={deleteProduct}>
    <IconButton actionType='delete' />

  </FormContainer>
}

export default AdminProductsPage
