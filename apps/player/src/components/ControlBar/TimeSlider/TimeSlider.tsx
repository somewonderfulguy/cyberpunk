import * as Slider from '@radix-ui/react-slider'

import { usePlayerControls, usePlayerValue } from '../../../stores/playerStore'

import styles from './TimeSlider.module.css'

const TimeSlider = () => {
  const { seek } = usePlayerControls()
  const currentTime = usePlayerValue((s) => s.currentTime)
  const duration = usePlayerValue((s) => s.duration) || 0

  return (
    <Slider.Root
      className={styles.root}
      value={[currentTime]}
      max={duration > 0 ? duration : 0}
      step={1}
      onValueChange={(values) => {
        const val = values[0] ?? 0
        seek(val)
      }}
    >
      <div className={styles.trackContainer}>
        <Slider.Track className={styles.track}>
          <Slider.Range className={styles.range} />
        </Slider.Track>
      </div>
      <Slider.Thumb className={styles.thumb} aria-label="Time" />
    </Slider.Root>
  )
}

export default TimeSlider
