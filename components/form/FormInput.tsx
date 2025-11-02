import { Label } from '../ui/label';
import { Input } from '../ui/input';

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

// We set the name, type, label, defaultValue, placeholder props equal to FormInputProps
function FormInput({name, type, label, defaultValue, placeholder}: FormInputProps) {
  return (
    <div>
      <div className = "mb-2">
          <Label htmlFor={name} className='capitalize'>{label || name}</Label> 
          <Input id={name} name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required />
        </div>
    </div>
  )
}

export default FormInput
