import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs } from './Tabs'

const meta = {
  title: 'Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Underline: Story = {
  args: {
    defaultValue: 'tab3',
    // value: 'tab3',
  },
}
