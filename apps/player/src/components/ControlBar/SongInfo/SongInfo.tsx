import { usePlayerValue } from '../../../stores/playerStore'

import styles from './SongInfo.module.css'
import preview from './assets/preview.jpg'

const SongInfo = () => {
  const current = usePlayerValue((s) => (s.currentIndex == null ? null : s.playlist[s.currentIndex]))

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={typeof preview === 'string' ? preview : (preview as { src: string })?.src}
          alt="Song preview"
          className={styles.image}
          data-augmented-ui="tl-clip"
        />
      </div>
      <div className="song-info__text">
        <h2 className={styles.name}>{current?.name ?? 'Select a song'}</h2>
        {current && (
          <p className="song-info__artist">
            {current.artist} • {current.album} • {current.year}
          </p>
        )}
      </div>
    </div>
  )
}

export default SongInfo
