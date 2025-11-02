import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Prisma } from '@prisma/client';
// if you want to access the properties, it is Prisma
// Look for the correct model & in this case it is going to be a product one
// Then access the matching property using prisma
// Prisma.ProductScalarFieldEnum.product

const name = 'price';
type FormInputNumberProps = {
  defaultValue?: number;
};

// The defaultValue is going to be the only prop & we set it equal to FormInputNumberProps
// Since defaultValue is optional, we want to use a hardcoded value
function PriceInput({defaultValue}:FormInputNumberProps) {
  return (
    <div className='mb-2'>
        <Label htmlFor={name} className='capitalize'>Price ($)</Label>
        <Input id={name} type='number' name={name} min={0} defaultValue={defaultValue || 100} required />
    </div>
  )
}

export default PriceInput
