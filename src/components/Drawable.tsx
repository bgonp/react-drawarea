import React, { CSSProperties, FC, useRef } from 'react'

import useDrawable from 'hooks/useDrawable'

import { Point } from 'types'

type Props = {
  addPoint: (point: Point) => void
  finishLine: () => void
}

const style: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const Drawable: FC<Props> = ({ addPoint, finishLine }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { startDrawing, keepDrawing, endDrawing } = useDrawable({ ref, addPoint, finishLine })

  return (
    <div
      ref={ref}
      style={style}
      onMouseDown={startDrawing}
      onMouseMove={keepDrawing}
      onMouseUp={endDrawing}
      onMouseLeave={endDrawing}
      onTouchStart={startDrawing}
      onTouchMove={keepDrawing}
      onTouchEnd={endDrawing}
    />
  )
}

export default Drawable
