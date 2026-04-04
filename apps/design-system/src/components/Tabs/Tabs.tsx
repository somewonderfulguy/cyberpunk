import { Root, Trigger, Content, type TabsProps as TabsPropsRadix } from '@radix-ui/react-tabs'
import { useCallback, useLayoutEffect, useRef, type ComponentProps } from 'react'

import { mergeRefs } from '@repo/shared/utils/mergeRefs'

import {
  initialState,
  type TabsContextState,
  TabsProvider,
  useTabsValue,
  useTabsDispatch,
} from './hooks'
import { DATA_VALUE_KEY } from './constants'
import { TabList } from './TabsList'

type TabsProps = TabsPropsRadix & ComponentProps<'div'>

export const Tabs = ({
  initial,
  defaultValue,
  value,
  ...props
}: TabsProps & { initial?: Partial<TabsContextState> }) => (
  <TabsProvider
    initial={{
      ...initialState,
      ...initial,
      value: value ?? defaultValue ?? initial?.value ?? initialState.value,
    }}
  >
    <TabsInner value={value} defaultValue={defaultValue} {...props} />
  </TabsProvider>
)

const TabsInner = ({ value: propValue, defaultValue, onValueChange, ref, ...props }: TabsProps) => {
  const value = useTabsValue((s) => s.value)
  const selectedIndex = useTabsValue((s) => s.selectedIndex)
  const dispatch = useTabsDispatch()

  const rootRef = useRef<HTMLDivElement>(null)

  const getTabs = useCallback(
    () => Array.from(rootRef.current?.querySelectorAll('[role="tablist"] [role="tab"]') ?? []),
    [],
  )

  // setup value if user not specified one
  useLayoutEffect(() => {
    // exit early if value exist
    if (typeof value !== 'undefined') return

    const tabs = getTabs()

    // take `propValue` or `defaultValue` if present
    if (propValue || defaultValue) {
      const newValue = propValue ?? defaultValue
      const newIndex = tabs.findIndex((tab) => tab.getAttribute(DATA_VALUE_KEY) === newValue)
      return dispatch({ value: newValue, selectedIndex: newIndex })
    }

    // take first tab value if present
    const dataValue = tabs[0]?.getAttribute(DATA_VALUE_KEY)
    if (dataValue) dispatch({ value: dataValue, selectedIndex: 0 })
  }, [value, propValue, defaultValue, dispatch, getTabs])

  // set selectedIndex on init...

  return (
    <>
      propValue: {propValue}
      <br />
      defaultValue: {defaultValue}
      <br />
      value: {value}
      <br />
      selectedIndex: {selectedIndex}
      <hr style={{ margin: '20px 0' }} />
      <Root
        ref={mergeRefs(rootRef, ref)}
        defaultValue={defaultValue}
        value={propValue}
        onValueChange={(newValue) => {
          onValueChange?.(newValue)
          if (propValue) return
          const newIndex = getTabs().findIndex(
            (tab) => tab.getAttribute(DATA_VALUE_KEY) === newValue,
          )
          dispatch({ value: newValue, selectedIndex: newIndex })
        }}
        {...props}
      >
        <TabList>
          <Trigger value="tab1" {...{ [DATA_VALUE_KEY]: 'tab1' }}>
            One
          </Trigger>
          <Trigger value="tab2" {...{ [DATA_VALUE_KEY]: 'tab2' }}>
            Two
          </Trigger>
          <Trigger value="tab3" {...{ [DATA_VALUE_KEY]: 'tab3' }}>
            Three
          </Trigger>
        </TabList>
        <Content value="tab1">Tab one content</Content>
        <Content value="tab2">Tab two content</Content>
        <Content value="tab3">Tab three content</Content>
      </Root>
    </>
  )
}
