// TODO: create state machine

import { useCallback } from 'react'

import { createContextStore } from '@repo/shared/utils/createContextStore'

export type PlayerSong = {
  id: string
  name: string
  artist: string
  album: string
  year: number
  durationInSeconds: number
  explicit: boolean
  url: string
}

export interface PlayerContextType {
  playlist: PlayerSong[]
  currentIndex: number | null
  isPlaying: boolean
  volume: number // 0..1
  currentTime: number // seconds
  duration: number // seconds
  analyser: AnalyserNode | null
}

const initialState: PlayerContextType = {
  playlist: [],
  currentIndex: null,
  isPlaying: false,
  volume: 1,
  currentTime: 0,
  duration: 0,
  analyser: null,
}

const {
  Provider: PlayerProvider,
  useStoreValue: usePlayerValue,
  useStoreDispatch: usePlayerDispatch,
} = createContextStore<PlayerContextType>(initialState, 'PlayerContext')

// --- Web Audio engine (module-scoped, shared across app) ---

let audioCtx: AudioContext | null = null
let audioEl: HTMLAudioElement | null = null
let sourceNode: MediaElementAudioSourceNode | null = null
let gainNode: GainNode | null = null
let analyserNode: AnalyserNode | null = null

const ensureEngine = (dispatch: ReturnType<typeof usePlayerDispatch>) => {
  if (typeof window === 'undefined') return null
  if (audioCtx && audioEl && sourceNode && gainNode && analyserNode) {
    return { audioCtx, audioEl, sourceNode, gainNode, analyserNode }
  }

  const ctx = new AudioContext()
  const el = new Audio()
  el.crossOrigin = 'anonymous'
  const srcNode = ctx.createMediaElementSource(el)
  const g = ctx.createGain()
  const analyser = ctx.createAnalyser()

  srcNode.connect(g)
  g.connect(ctx.destination)
  srcNode.connect(analyser)

  g.gain.value = 1

  el.addEventListener('timeupdate', () => {
    const t = el.currentTime || 0
    dispatch({ currentTime: t })
  })

  el.addEventListener('loadedmetadata', () => {
    const d = el.duration || 0
    dispatch({ duration: Number.isFinite(d) ? d : 0 })
  })

  el.addEventListener('ended', () => {
    // Auto-advance to next track when current finishes
    dispatch((prev) => {
      if (prev.playlist.length === 0 || prev.currentIndex === null) {
        return { ...prev, isPlaying: false, currentTime: 0 }
      }
      const nextIndex = prev.currentIndex + 1
      if (nextIndex >= prev.playlist.length) {
        return { ...prev, isPlaying: false, currentTime: 0 }
      }
      const nextSong = prev.playlist[nextIndex]
      if (!nextSong) return { ...prev, isPlaying: false }

      // load & play side-effect
      el.src = `http://localhost:7070${nextSong.url}`
      el.currentTime = 0
      void el.play()

      return {
        ...prev,
        currentIndex: nextIndex,
        isPlaying: true,
        currentTime: 0,
      }
    })
  })

  audioCtx = ctx
  audioEl = el
  sourceNode = srcNode
  gainNode = g
  analyserNode = analyser

  dispatch({ analyser })

  return { audioCtx, audioEl, sourceNode, gainNode, analyserNode }
}

const loadAndPlay = (dispatch: ReturnType<typeof usePlayerDispatch>, song: PlayerSong, index: number) => {
  const engine = ensureEngine(dispatch)
  if (!engine || !audioEl) return

  if (audioCtx?.state === 'suspended') {
    void audioCtx.resume()
  }

  audioEl.src = `http://localhost:7070${song.url}`
  audioEl.currentTime = 0
  void audioEl.play()

  dispatch({
    currentIndex: index,
    isPlaying: true,
    currentTime: 0,
  })
}

const togglePlayImpl = (state: PlayerContextType, dispatch: ReturnType<typeof usePlayerDispatch>) => {
  const engine = ensureEngine(dispatch)
  if (!engine || !audioEl) return

  if (!state.playlist.length) return

  // No current track yet – start from 0
  if (state.currentIndex === null) {
    const first = state.playlist[0]
    if (!first) return
    loadAndPlay(dispatch, first, 0)
    return
  }

  if (audioCtx?.state === 'suspended') {
    void audioCtx.resume()
  }

  if (state.isPlaying) {
    audioEl.pause()
    dispatch({ isPlaying: false })
  } else {
    void audioEl.play()
    dispatch({ isPlaying: true })
  }
}

const seekImpl = (time: number, dispatch: ReturnType<typeof usePlayerDispatch>) => {
  if (!audioEl) return
  audioEl.currentTime = time
  dispatch({ currentTime: time })
}

const setVolumeImpl = (volume: number, dispatch: ReturnType<typeof usePlayerDispatch>) => {
  const v = Math.min(1, Math.max(0, volume))
  if (gainNode) {
    gainNode.gain.value = v
  }
  if (audioEl) {
    audioEl.volume = v
  }
  dispatch({ volume: v })
}

const nextImpl = (state: PlayerContextType, dispatch: ReturnType<typeof usePlayerDispatch>) => {
  if (!state.playlist.length) return
  const current = state.currentIndex ?? 0
  const nextIndex = current + 1
  if (nextIndex >= state.playlist.length) {
    // stop at end for now
    if (audioEl) {
      audioEl.pause()
      audioEl.currentTime = 0
    }
    dispatch({ isPlaying: false, currentIndex: null, currentTime: 0 })
    return
  }
  const song = state.playlist[nextIndex]
  if (!song) return
  loadAndPlay(dispatch, song, nextIndex)
}

const prevImpl = (state: PlayerContextType, dispatch: ReturnType<typeof usePlayerDispatch>) => {
  if (!state.playlist.length) return
  const current = state.currentIndex ?? 0
  const prevIndex = current - 1
  if (prevIndex < 0) {
    if (audioEl) {
      audioEl.currentTime = 0
    }
    dispatch({ currentTime: 0 })
    return
  }
  const song = state.playlist[prevIndex]
  if (!song) return
  loadAndPlay(dispatch, song, prevIndex)
}

// Convenience hook to access full state + imperative controls
export const usePlayerControls = () => {
  const state = usePlayerValue((s) => s)
  const dispatch = usePlayerDispatch()

  const setPlaylist = useCallback(
    (playlist: PlayerSong[]) => {
      dispatch({ playlist })
    },
    [dispatch],
  )

  const playIndex = useCallback(
    (index: number) => {
      const song = state.playlist[index]
      if (!song) return
      loadAndPlay(dispatch, song, index)
    },
    [dispatch, state.playlist],
  )

  const togglePlay = useCallback(() => {
    togglePlayImpl(state, dispatch)
  }, [state, dispatch])

  const seek = useCallback(
    (time: number) => {
      seekImpl(time, dispatch)
    },
    [dispatch],
  )

  const setVolume = useCallback(
    (volume: number) => {
      setVolumeImpl(volume, dispatch)
    },
    [dispatch],
  )

  const next = useCallback(() => {
    nextImpl(state, dispatch)
  }, [state, dispatch])

  const prev = useCallback(() => {
    prevImpl(state, dispatch)
  }, [state, dispatch])

  return {
    state,
    setPlaylist,
    playIndex,
    togglePlay,
    seek,
    setVolume,
    next,
    prev,
  }
}

export { PlayerProvider, usePlayerValue, usePlayerDispatch }
