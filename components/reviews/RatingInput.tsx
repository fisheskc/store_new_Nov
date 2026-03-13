import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


function RatingInput({name,labelText}:{name:string, labelText?:string}) {
    // This is what we are going to use in order to iterate over & display
    // the Select input.
    // Then in the callback function & we want to access the index.
    // Whatever, we are going to return from this function is going to be stored as an item
    const numbers = Array.from({length:5},(_,i) => {
    const value = i + 1 
    // We want to reverse it, as we want to display the number five as a first item
    // SelectValue, whatever is the current value 
    return value.toString()
    }).reverse()
  return (
    <div className='mb-2 maX-W-XS'> 
        <Label htmlFor={name} className='capitalize'>
            {labelText || name}
        </Label>
        <Select defaultValue={numbers[0]} name={name}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {numbers.map((number) =>{
                    return <SelectItem key={number} value={number}>
                        {number}
                    </SelectItem>
                })}
            </SelectContent>
        </Select>
    </div>
  )
}

export default RatingInput