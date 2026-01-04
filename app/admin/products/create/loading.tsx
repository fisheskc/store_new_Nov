'use client'
import { memo } from 'react';

import LoadingTable from '@/components/global/LoadingTable';

function loading() {
    // If we use the default value, we will have less rows
  return (
    <LoadingTable rows={10} />
  )
}

export default memo(loading)