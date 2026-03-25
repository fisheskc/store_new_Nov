import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export enum Mode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem',
}

type SelectProductAmountProps = {
 // We render it in the SingleProduct page or productDetails page or in the cartItem
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};
// In the SingleProduct, we will have these props
type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  // How many items we have selected?
  amount: number;
  // In this component, we are going to pass in a function which is going to control that amount
  // in the parent component
  // We are going to invoke this function in our SelectProductAmount.
  // We can see the differnece between the functions, this one will be async in the cart.
  setAmount: (value: number) => Promise<void>;
  // This is a special prop that is only available if we render that in the cartItems, which is going
  // to be the loading one.
  isLoading: boolean;
};

function SelectProductAmount(props:SelectProductAmountProps | SelectCartItemAmountProps) {
    // This isLoading is not going to be available with all of the props.
    // If the mode is equalto a CartItem
    // isLoading is only access conditio = nally if it is a mode and cartItem
    const {mode, amount, setAmount} = props

    const cartItem = mode === Mode.CartItem
    // We access the amount, so whatever amount is passed in.
    // This component always wants a string
    // We will take in the number, will transform it into a string.
    // Once the value has changed, we will turn it back into the number that is what we have in the database
    // If we are loading in the cartItem, which we have access to
    // We use the disabled prop.
    // If this value is true, then it is going to be disabled
    // This is not the cartItem. 
    // We are not going to disable the select one
    // We want return our select Item. Either values 1 to 10 or the values that we have in the cartItem
    return (
        <>
           <h4 className='mb-2'>Amount:</h4> 
           <Select defaultValue={amount.toString()}
           onValueChange={(value) =>setAmount(Number(value))}
           disabled={cartItem ? props.isLoading : false}>
            <SelectTrigger className={cartItem ? 'w-[100px]':'w-[150px]'}>
                <SelectValue placeholder={amount} />
            </SelectTrigger>
            <SelectContent>
                {Array.from({length:cartItem? amount + 10 :10},(_,index)=> {
                    const selectValue = (index +1).toString()
                    return <SelectItem key={selectValue} value={selectValue}>
                        {selectValue}
                    </SelectItem>
                })}
            </SelectContent>
           </Select>
        </>
  )
}

export default SelectProductAmount


