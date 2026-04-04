import { HTMLAttributes } from 'react'

import classNames from '@repo/shared/utils/classNames'

import { usePlayerValue } from '../../../stores/playerStore'

import styles from './TimeCount.module.css'

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const TimeCount = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const currentTime = usePlayerValue((s) => s.currentTime)
  const duration = usePlayerValue((s) => s.duration)

  return (
    <div className={classNames(styles.time, className)} {...props}>
      {formatTime(currentTime)} <span className={styles.timeSeparator}>/</span> {formatTime(duration)}
    </div>
  )
}

export default TimeCount
