import { Skeleton } from "../ui/skeleton"

// We will have the a prop, which will be rows, & type will be equal to a number.
// It is technically optional, & by default we will set it equal to five
// If no value is provided, it is going to be five
function LoadingTable({rows=5}: {rows?:number}) {
    // We will construct an array, & we will iterate over it. Then for every item we will display that skeleton
    // Whatever we return from this function is going to be set as a new value.
    // Since we just use the length, all of the values are going to be undefined
    // As we are iterating over, what do we want to store in the tableRows?
    // For ever item, we are going to use a div
    const tableRows = Array.from({length: rows}, (_,index) => {
        return <div className="mb-4" key={index}>
            <Skeleton className= 'w-full h-8 rounded' /> 
        </div>
    })
    return (
    <>{tableRows}</>
  )
}

export default LoadingTable