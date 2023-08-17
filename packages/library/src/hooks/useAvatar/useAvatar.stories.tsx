import type { Meta, StoryObj } from '@storybook/react'

import { useThemeState } from '@contexts/themeContext'

import useAvatar from './useAvatar'

import avatar from './assets/silverhand300.jpg'
import avatarRed from './assets/silverhand300_red.jpg'
import avatarGreen from './assets/silverhand300_green.jpg'

const ExampleComponent = () => {
  const { getAvatarProps } = useAvatar<HTMLDivElement>()
  const theme = useThemeState()
  return (
    <div {...getAvatarProps()}>
      <img
        src={
          theme === 'darkRed'
            ? avatarRed
            : theme === 'dark'
            ? avatarGreen
            : avatar
        }
        alt="avatar"
      />
    </div>
  )
}

const meta = {
  title: 'hooks/useAvatar',
  component: ExampleComponent,
  tags: ['autodocs']
} as Meta<typeof ExampleComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
