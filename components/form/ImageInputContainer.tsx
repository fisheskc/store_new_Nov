'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import FormContainer from './FormContainer';
import ImageInput from './ImageInput';
import { SubmitButton } from './Buttons';
import { type actionFunction } from '@/utils/types';

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  // The children are going to be optional
  children?: React.ReactNode;
};

// We are going to render this ImageInputContainer in our edit page
// In our case, we are going to use children to pass down to the product ID, 
function ImageInputContainer(props:ImageInputContainerProps) {
    const {image, name, action, text, children} = props;
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    // We want to display the current image
    // We want to check the state value & if it is true, we want to render the FormContainer
    // We are accessing the action as a prop & passing it down to our Formcontainer
    // We want to render those children if they are provided
    // In order to pass some hidden inputs, we can access some values in the action
    // We want to access those inputs with the help of our form data
    // Inside the FormContainer, we do need to provide the children
    // When it comes to the image, remember in the ImageInput, we have hardcoded the name equal to an image
    // We want to access the product ID & also the old image URL, which we are passing in the children
    return (
        <div className='mb-8'>
            <Image src={image} width={200} height={200} className='rounded object-cover mb-4 w-[200px] h-[200px]' alt={name} priority />
            <Button variant='outline' size='sm' onClick={() => setUpdateFormVisible((prev) => !prev)}>
            {text}
            </Button> 
            {isUpdateFormVisible && <div className='max-w-md mt-4'>
             <FormContainer action={action}>
                {props.children}
                <ImageInput />
                <SubmitButton size='sm' text={text} /> 
             </FormContainer>   
           </div>}
         </div>
    )
}
    
export default ImageInputContainer;