'use client'

import { CSSProperties, useEffect, useState } from 'react'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@repo/design-system/Tabs'
import useResizeObserver from '@repo/shared/hooks/useResizeObserver'

import { usePlayerControls, usePlayerValue } from '../../stores/playerStore'

import styles from './Sidebar.module.css'

type Song = {
  id: string
  name: string
  artist: string
  album: string
  year: number
  durationInSeconds: number
  explicit: boolean
  url: string
}

const Sidebar = () => {
  const [tabListHeight, setTabListHeight] = useState(0)
  const tabListRef = useResizeObserver((bounds) => setTabListHeight(bounds.height))
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setPlaylist, playIndex } = usePlayerControls()
  const currentIndex = usePlayerValue((s) => s.currentIndex)

  useEffect(() => {
    let cancelled = false
    const fetchSongs = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('http://localhost:7070/songs')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as Song[]
        if (!cancelled) {
          setSongs(data)
          setPlaylist(data)
        }
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Failed to load songs'
        if (!cancelled) setError(message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchSongs()
    return () => {
      cancelled = true
    }
  }, [setPlaylist])

  return (
    <div className={styles.sidebar}>
      <Tabs type="folder" className={styles.tabs}>
        <TabList className={styles.tabList} ref={tabListRef}>
          <Tab>Playlist</Tab>
          <Tab>Lyrics</Tab>
        </TabList>
        <TabPanels
          className={styles.tabPanels}
          disableHeightAnimation
          style={{ '--_tab-list-height': tabListHeight + 'px' } as CSSProperties}
        >
          <TabPanel className={styles.tabPanel}>
            {loading && <div>Loading…</div>}
            {error && <div style={{ color: 'var(--error, #f55)' }}>Error: {error}</div>}
            {!loading && !error && (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {songs.map((s, index) => {
                  const isActive = currentIndex === index
                  return (
                    <li
                      key={s.id}
                      className={`${styles.songItem} ${isActive ? styles.active : ''}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        playIndex(index)
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{s.name}</div>
                      <div style={{ opacity: 0.75, fontSize: '0.9em' }}>
                        {s.artist} • {s.album} • {s.year}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </TabPanel>
          <TabPanel className={styles.tabPanel}>
            <div>Lyrics content</div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default Sidebar
