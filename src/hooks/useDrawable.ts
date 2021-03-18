import { RefObject, MouseEvent, TouchEvent, useState } from 'react'

import { Point } from 'types'

type UseDrawableType = {
  startDrawing: (event: MouseEvent | TouchEvent) => void
  keepDrawing: (event: MouseEvent | TouchEvent) => void
  endDrawing: () => void
}

type UseDrawableProps = {
  ref: RefObject<HTMLDivElement>
  addPoint: (point: Point) => void
  finishLine: () => void
}

const getCoordinates = (event: MouseEvent | TouchEvent): [number, number] | null => {
  if (event instanceof MouseEvent && event.button === 0) {
    return [event.clientX, event.clientY]
  } else if (event instanceof TouchEvent && event.touches.length > 0) {
    return [event.touches[0].clientX, event.touches[0].clientY]
  }
  return null
}

const useDrawable = ({ ref, addPoint, finishLine }: UseDrawableProps): UseDrawableType => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false)

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

  const startDrawing = (event: MouseEvent | TouchEvent) => {
    const firstPoint = getPoint(event)
    if (!firstPoint) return
    addPoint(firstPoint)
    setIsDrawing(true)
  }

  const keepDrawing = (event: MouseEvent | TouchEvent) => {
    if (!isDrawing) return
    const nextPoint = getPoint(event)
    if (!nextPoint) return
    addPoint(nextPoint)
  }

  const endDrawing = () => {
    if (!isDrawing) return
    finishLine()
    setIsDrawing(false)
  }

  return { startDrawing, keepDrawing, endDrawing }
}

export default useDrawable
