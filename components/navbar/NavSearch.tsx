'use client';
import { Input } from '../ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';

function NavSearch() {
  const searchParams =  useSearchParams();
  // replace is what we are getting back from useRouter
  const {replace} = useRouter()
  // We want construct the state value. We Will have a controlled input
  // We want to use the value from the URL, because we want the ability to copy & paste the URL
  // We do need to remember that potentially this could be undefined, therefore we will add optional chaining
  // If there is no value, then we will use empty string
  // We will set up a function which is going to be invoked each & every time we will type something in the input
  // Then we will navigate to the input & set up the value as well as the onChange
  // The value is going to be the current value or whatever we are getting from the URL
  // We access the event, since in the event target value, we will have the input value
  // onChange - we want invoke two things, first we want to invoke the setSearch, which is going to control the state value.
  // We want to pass in the event.target & then the value. It will actuallty navigate to the products & provide the correct query params
  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '')
  // We want to run this particular useDebouncedCallback funtion with some delay
  // useDebouncedCallback is looking for two things, a function we want to invoke & the second one is going to be the time 
  // Since we are using typeScript, we need to say what kind of type
  const handleSearch = useDebouncedCallback((value:string) => {
    // In the functionality, we will use query params
    // URLSearchParams is built into the browsers
    const params = new URLSearchParams(searchParams)
    // We want to check if there is some value
    // If user has provided some searchTerm, we want to add a search query params to our params
    // If there is some value, we will use params.set, a special method. The name needs to match, otherwise it will not make sense
    if(value) {
      params.set('search', value)
      // If the input is empty, the user has not provided the value or they deleted the value
      // we will use else
    } else {
      params.delete('search')
    }
    // We want to access our params & attach them to our URL.
    // The last thing is to set the state value back to empty, if we have no value in the searchParams
    // We will do that with the useEffect hook
    replace(`/products?${params.toString()}`);
  },500)

  // We also want to provide the dependency array & we wamt to run this each & everytime there is going to be some change in the search query params
  useEffect(() => {
     // if there is nothing in the search. We use searchParams.get() to access the search then we set the state value to empty string
     if(!searchParams.get('search')) {
        setSearch('')
     }
  },[searchParams.get('search')])

  return (
    <Input
      type='search'
      placeholder="search product... "
      className="max-w-xs dark:bg-muted"
      onChange ={(e)=> {
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
      value={search}
    />
  )
}

export default NavSearch