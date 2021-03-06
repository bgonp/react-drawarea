import React, { createContext, FC, useState } from 'react'
import * as PropTypes from 'prop-types'

import DrawZone from './DrawZone'

import { Lines } from './types'

type DrawContextType = {
  lines: Lines
  setLines: (lines: Lines) => void
  isDrawing: boolean
  setIsDrawing: (isDrawing: boolean) => boolean
  reset: () => void
  undo: () => void
}

type Props = {
  className?: string
  color?: string
  disabled?: boolean
  hidden?: boolean
  thickness?: number
}

export const DrawContext = createContext<DrawContextType>(null)

export const DrawProvider: FC<Props> = ({ children, ...props }) => {
  const [lines, setLines] = useState<Lines>([])
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

  const reset = () => setLines([])
  const undo = () => setLines(lines.slice(0, -1))

  return (
    <DrawContext.Provider value={{ lines, setLines, isDrawing, setIsDrawing, reset, undo }}>
      {children}
      <DrawZone {...props} />
    </DrawContext.Provider>
  )
}

DrawZone.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  thickness: PropTypes.number,
}

DrawZone.defaultProps = {
  className: '',
  color: '#000000',
  disabled: false,
  hidden: false,
  thickness: 10,
}
