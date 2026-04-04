import { createContextStore } from '@repo/shared/utils/createContextStore'

type TabsContextState = {
  value?: string
  selectedIndex: number
}

const initialState: TabsContextState = {
  value: undefined,
  selectedIndex: 0,
}

const {
  Provider: TabsProvider,
  useStoreValue: useTabsValue,
  useStoreDispatch: useTabsDispatch,
} = createContextStore<TabsContextState>(initialState, 'TabsContext')

export { initialState, type TabsContextState, TabsProvider, useTabsValue, useTabsDispatch }
