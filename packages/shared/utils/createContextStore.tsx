'use client'

import {
  useRef,
  createContext,
  useContext,
  useCallback,
  type ReactNode,
  useMemo,
  useSyncExternalStore,
} from 'react'

/**
 * Creates a context-based store that minimizes unnecessary re-renders
 * (Prevents React from re-rendering all components that under the context component)
 */
export function createContextStore<TStore>(initialState: TStore, displayName?: string) {
  type PrevStateFnUpdate = (prevValue: TStore) => TStore
  const useStoreData = (
    init: TStore,
  ): {
    get: () => TStore
    set: (value: Partial<TStore> | PrevStateFnUpdate) => void
    subscribe: (callback: () => void) => () => void
  } => {
    const store = useRef(init)

    const subscribers = useRef(new Set<() => void>())

    const get = useCallback(() => store.current, [])

    const set = useCallback((value: Partial<TStore> | PrevStateFnUpdate) => {
      if (typeof value === 'function') {
        store.current = value(store.current)
      } else if (typeof value !== 'object') {
        store.current = value as TStore
      } else {
        store.current = { ...store.current, ...value }
      }
      subscribers.current.forEach((callback) => callback())
    }, [])

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback)
      return () => subscribers.current.delete(callback)
    }, [])

    return {
      get,
      set,
      subscribe,
    }
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>

  const StoreValueContext = createContext<Omit<UseStoreDataReturnType, 'set'> | undefined>(
    undefined,
  )
  const StoreDispatchContext = createContext<UseStoreDataReturnType['set'] | undefined>(undefined)

  const Provider = ({
    children,
    initial,
  }: {
    children: ReactNode
    /** Per-instance dynamic defaults (e.g., from URL) merged with base initialState */
    initial?: Partial<TStore>
  }) => {
    const initRef = useRef<TStore>(initial ? { ...initialState, ...initial } : initialState)
    const { get, set, subscribe } = useStoreData(initRef.current)
    return (
      <StoreDispatchContext.Provider value={set}>
        <StoreValueContext.Provider value={useMemo(() => ({ get, subscribe }), [get, subscribe])}>
          {children}
        </StoreValueContext.Provider>
      </StoreDispatchContext.Provider>
    )
  }
  if (displayName) Provider.displayName = displayName

  function useStoreValue(): TStore
  function useStoreValue<TSelectorOutput>(
    selector: (store: TStore) => TSelectorOutput,
    ssrSelector?: (store: TStore) => TSelectorOutput,
  ): TSelectorOutput
  function useStoreValue<TSelectorOutput = TStore>(
    selector?: (store: TStore) => TSelectorOutput,
    ssrSelector?: (store: TStore) => TSelectorOutput,
  ): TSelectorOutput | TStore {
    const store = useContext(StoreValueContext)

    if (store === undefined) {
      throw new Error(`useStoreValue must be used inside a ${displayName ?? 'Provider'}`)
    }

    const getSnapshot = () => {
      const currentStore = store.get()
      return selector ? selector(currentStore) : currentStore
    }

    return useSyncExternalStore(
      store.subscribe,
      getSnapshot,
      ssrSelector ? () => ssrSelector(store.get()) : undefined,
    )
  }

  const useStoreDispatch = () => {
    const set = useContext(StoreDispatchContext)
    if (set === undefined) {
      throw new Error(`useStoreDispatch must be used inside a ${displayName ?? 'Provider'}`)
    }
    return set
  }

  return {
    Provider,
    useStoreValue,
    useStoreDispatch,
  }
}
