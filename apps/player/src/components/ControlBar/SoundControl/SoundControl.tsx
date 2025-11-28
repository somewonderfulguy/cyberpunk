import * as Slider from '@radix-ui/react-slider'

import Button from '@repo/design-system/controls/Button'

import { usePlayerControls, usePlayerValue } from '../../../stores/playerStore'

import styles from './SoundControl.module.css'
import { SoundMaxIcon } from './assets/soundControlIcons'

const SoundControl = () => {
  const { setVolume } = usePlayerControls()
  const volume = usePlayerValue((s) => s.volume)
  const volPercent = Math.round((volume ?? 1) * 100)

  return (
    <div className={styles.container}>
      <Button buttonStyle="svg">
        <SoundMaxIcon />
      </Button>

      {/* TODO: create generic slider component */}
      <div className={styles.sliderContainer}>
        <Slider.Root
          className={styles.root}
          value={[volPercent]}
          max={100}
          step={1}
          onValueChange={(values) => {
            const val = values[0] ?? 0
            setVolume(val / 100)
          }}
        >
          <Slider.Track className={styles.track}>
            <Slider.Range className={styles.range} />
          </Slider.Track>
          <Slider.Thumb className={styles.thumb} aria-label="Volume" />
        </Slider.Root>
      </div>
    </div>
  )
}

export default SoundControl
