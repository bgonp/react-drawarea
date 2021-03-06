import React, {
  CSSProperties,
  FC,
  MouseEvent,
  TouchEvent,
  useRef,
  useState,
} from 'react'

import { Point } from './types'

type Props = {
  addPoint: (point: Point) => void
  finishLine: () => void
}

const style: CSSProperties = {
  position: 'absolute',
  inset: 0,
}

const getCoordinates = (event: MouseEvent | TouchEvent): [number, number] | null => {
  if (event.button === 0) {
    return [event.clientX, event.clientY]
  } else if (event.touches?.length) {
    return [event.touches[0].clientX, event.touches[0].clientY]
  }
  return null
}

const Drawable: FC<Props> = ({ addPoint, finishLine }) => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  const getPoint = (event: MouseEvent | TouchEvent): Point | null => {
    if (!ref.current) return null
    const coords = getCoordinates(event)
    if (!coords) return null
    const rect = ref.current.getBoundingClientRect()
    return {
      x: coords[0] - rect.left,
      y: coords[1] - rect.top,
    }
  }

  const onStartDrawing = (event: MouseEvent | TouchEvent) => {
    const firstPoint = getPoint(event)
    if (!firstPoint) return
    addPoint(firstPoint)
    setIsDrawing(true)
  }

  const onMoveDrawing = (event: MouseEvent | TouchEvent) => {
    if (!isDrawing) return
    const nextPoint = getPoint(event)
    if (!nextPoint) return
    addPoint(nextPoint)
  }

  const onEndDrawing = () => {
    if (!isDrawing) return
    finishLine()
    setIsDrawing(false)
  }

  return (
    <div
      ref={ref}
      style={style}
      onMouseDown={onStartDrawing}
      onMouseMove={onMoveDrawing}
      onMouseUp={onEndDrawing}
      onMouseLeave={onEndDrawing}
      onTouchStart={onStartDrawing}
      onTouchMove={onMoveDrawing}
      onTouchEnd={onEndDrawing}
    />
  )
}

export default Drawable
