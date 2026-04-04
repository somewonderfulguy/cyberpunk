'use client'

import { useState } from 'react'

import Button from '@repo/design-system/controls/Button'

import { ExpandIcon, ShrinkIcon } from './assets/fullscreenButtonIcons'

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <Button
      buttonStyle="svg"
      onClick={() => setIsFullscreen((prev) => !prev)}
      style={{ width: 18, height: 18 }}
    >
      {isFullscreen ? <ShrinkIcon /> : <ExpandIcon />}
    </Button>
  )
}

export default FullscreenButton
