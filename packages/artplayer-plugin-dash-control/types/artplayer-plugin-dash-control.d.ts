import type Artplayer from 'artplayer'

interface Config {
  control?: boolean
  setting?: boolean
  title?: string
  auto?: string
  getName?: (level: object) => string
}

declare const artplayerPluginDashControl: (option: { quality?: Config, audio?: Config }) => (art: Artplayer) => {
  name: 'artplayerPluginDashControl'
  update: () => void
}

export default artplayerPluginDashControl
