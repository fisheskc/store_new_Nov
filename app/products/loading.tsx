'use client'
import { memo } from 'react';

import LoadingContainer from '@/components/global/LoadingContainer';

function loading() {
  return (
    <LoadingContainer />
  )
}

export default memo(loading)
