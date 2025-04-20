import type { ComponentProps } from 'react'

type IconProps = ComponentProps<'svg'>

export const PreviousIcon = (props: IconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="200px"
    width="200px"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
  </svg>
)

export const RepeatIcon = (props: IconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="200px"
    width="200px"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
  </svg>
)

export const RepeatOneIcon = (props: IconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="200px"
    width="200px"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z" />
  </svg>
)

export const ShuffleIcon = (props: IconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="200px"
    width="200px"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="none"
      strokeLinecap="square"
      strokeMiterlimit="10"
      strokeWidth="32"
      d="m400 304 48 48-48 48m0-288 48 48-48 48M64 352h128l60-92"
    />
    <path
      fill="none"
      strokeLinecap="square"
      strokeMiterlimit="10"
      strokeWidth="32"
      d="M64 160h128l128 192h96m0-192h-96l-32 48"
    />
  </svg>
)

export const TrianglePointsToRightIcon = (props: IconProps) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M96 52v408l320-204L96 52z" />
  </svg>
)
