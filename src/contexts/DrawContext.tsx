import { createContext } from 'react'

import { Lines } from 'types'

type DrawContextType = {
  lines: Lines
  isDrawing: boolean
  reset: () => void
  undo: () => void
}

const DrawContext = createContext<DrawContextType | null>(null)

export default DrawContext
