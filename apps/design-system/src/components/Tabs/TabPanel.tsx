import { type ComponentProps, forwardRef, type HTMLAttributes, useRef } from 'react'
import { TabPanel as ReachTabPanel } from '@reach/tabs'

import { useFadeInOutAnimation } from './hooks'

const TabPanel = forwardRef<HTMLDivElement, ComponentProps<typeof ReachTabPanel> & HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    const divElem = useRef<HTMLDivElement>(null)

    useFadeInOutAnimation(divElem)

    return (
      <ReachTabPanel {...props} ref={ref}>
        <div ref={divElem}>{children}</div>
      </ReachTabPanel>
    )
  },
)
TabPanel.displayName = 'TabPanelWrapper'

export default TabPanel
