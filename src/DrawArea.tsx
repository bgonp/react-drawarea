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
  const [currentLine, setCurrentLine] = useState<Line>([])

  const reset = () => setLines([])

  const undo = () => setLines(lines.slice(0, -1))

  const finishLine = () => {
    if (currentLine.length > 1) setLines([...lines, currentLine])
    setCurrentLine([])
  }

  const addPoint = (newPoint: Point) =>
    setCurrentLine([...currentLine, newPoint])

  const content = hidden
    ? null
    : (
        <div className={className}>
          <Drawed color={color} lines={[...lines, currentLine]} thickness={thickness} />
          {disabled || <Drawable addPoint={addPoint} finishLine={finishLine} />}
        </div>
      )

  if (!children) return content

  return (
    <DrawContext.Provider value={{
      lines,
      isDrawing: currentLine.length > 0,
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
