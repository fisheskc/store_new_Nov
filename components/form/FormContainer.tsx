'use client';

import { useActionState } from 'react';
// With the useEffect, we will dsiplay the toast, in order to get the toast.
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { actionFunction } from '@/utils/types';

const initialState = {
    message: ''
}
// This componment is looking for two things. It is looking for the inputs we are going to display as well
// as the submit button. This one is going to be stored in the children prop & the second is going to be the action.
// Action is going to depend on the functionality.Eg in the update product, We will have update product action.
// In the create product, we will have the create product acion.
// In the delete, we will have the delete product action.

// This needs to be a prop action, so that is the function we are going to invoke when the form is being submitted.
// We use children since we do want to display the input. We set up the types. Type is going to be the action function
function FormContainer({action, children}:{action:actionFunction, children: React.ReactNode}) {
    // const [state,formAction] = useActionState(action, initialState);
    const [state,formAction] = useActionState(action, initialState);
    const {toast} = useToast();
    // Everytime the state value is going to change, we will display the toast.
    useEffect(() => {
        // Everytime the state is going to change, we are going to invoke this & we are going to check, if there is a value in the message.
       // Then we will display the toast, if not we will not do anything
       // A the very end we have the return & we use form action to render the form.
       // The createproductAction is in action.ts
        if(state.message) {
            toast({ description: state.message });
       }
    }, [state,  toast])
   return <form action={formAction}>{children}</form>;

}

export default FormContainer