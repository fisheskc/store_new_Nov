// What ever is going to be set up in this file, is going to be displayed when we are loading.
// In order for this to work, you need to fetch something, be it the page or the component, which is actually going to be our scenario.
// Do not set up the static content & expect loading to work
'use client'

function loading() {
  return (
    <div>
      loading...
    </div>
  )
}

export default loading