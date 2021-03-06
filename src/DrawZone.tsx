import React, { FC, useContext } from 'react'
import * as PropTypes from 'prop-types'

import { Point } from './types'
import Drawable from './Drawable'
import Drawed from './Drawed'
import { DrawContext } from './DrawContext'

type Props = {
  className: string
  color: string
  disabled: boolean
  hidden: boolean
  thickness: number
}

const DrawZone: FC<Props> = ({
  className,
  color,
  disabled,
  hidden,
  thickness,
}) => {
  const context = useContext(DrawContext)
  if (context === null) throw new Error('Cannot use DrawZone without context')

  const { lines, setLines, isDrawing, setIsDrawing } = context

  const finishLine = () => setIsDrawing(false)

  const addPoint = (newPoint: Point) => {
    if (isDrawing) {
      const prevLines = [...lines]
      const lastLine = prevLines.pop()
      setLines(prevLines.concat([lastLine.concat(newPoint)]))
    } else {
      setIsDrawing(true)
      setLines([...lines, [newPoint]])
    }
  }

  if (hidden) return null

  return (
    <div className={className}>
      <Drawed color={color} lines={lines} thickness={thickness} />
      {disabled || <Drawable addPoint={addPoint} finishLine={finishLine} />}
    </div>
  )
}

DrawZone.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  thickness: PropTypes.number,
}

export default DrawZone
