// This is going to be a client one
'use client'
import { useState } from "react"
import { Button } from '../ui/button';

function Comment({comment}:{comment:string}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }
    // We want to check whether the actual comment is a long comment
    // In our case, if it is more than 130.
    // If it is 130, the long comment is going to be true
    const longComment = comment.length > 130
    // We only want to display it if the long comment is true
     const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment;
  
return (
    <div>
      <p className='text-sm'>{displayComment}</p>
      {longComment && (
        <Button
          variant='link'
          className='pl-0 text-muted-foreground'
          onClick={toggleExpanded}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  );
}
export default Comment;