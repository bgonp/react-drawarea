import React, { FC, useState } from 'react'
import * as PropTypes from 'prop-types'

import Drawable from './Drawable'
import DrawContext from './DrawContext'
import Drawed from './Drawed'

import { Line, Lines, Point } from './types'

type Props = {
  className?: string
  color?: string
  disabled?: boolean
  hidden?: boolean
  thickness?: number
}

const DrawArea: FC<Props> = ({
  className = '',
  color = '#000000',
  disabled = false,
  hidden = false,
  thickness = 10,
  children,
}) => {
  const [lines, setLines] = useState<Lines>([])
  const [newLine, setNewLine] = useState<Line>([])
  const allLines = newLine.length === 0 ? lines : [...lines, newLine]

  const reset = () => setLines([])
  const undo = () => setLines(lines.slice(0, -1))
  const finishLine = () => {
    if (newLine.length > 1) setLines(allLines)
    setNewLine([])
  }
  const addPoint = (newPoint: Point) => setNewLine([...newLine, newPoint])

  const content = hidden
    ? null
    : (
        <div className={className}>
          <Drawed color={color} lines={allLines} thickness={thickness} />
          {disabled || <Drawable addPoint={addPoint} finishLine={finishLine} />}
        </div>
      )

  if (!children) return content

  return (
    <DrawContext.Provider value={{
      lines: allLines,
      isDrawing: newLine.length > 0,
      reset,
      undo,
    }}>
      {children}
      {content}
    </DrawContext.Provider>
  )
}

DrawArea.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  thickness: PropTypes.number,
}

export default DrawArea
