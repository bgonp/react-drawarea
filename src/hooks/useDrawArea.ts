import { useCallback, useMemo, useState } from 'react'

import { Lines, Point } from 'types'

type UseDrawAreaParams = {
  color: string
  thickness: number
}

type UseDrawAreaType = {
  isDrawing: boolean
  lines: Lines
  addPoint: (point: Point) => void
  finishLine: () => void
  reset: () => void
  undo: () => void
}

const useDrawArea = ({ color, thickness }: UseDrawAreaParams): UseDrawAreaType => {
  const [lines, setLines] = useState<Lines>([])
  const [points, setPoints] = useState<Point[]>([])

  const allLines: Lines = useMemo(
    () => points.length === 0 ? lines : [...lines, { color, points, thickness }],
    [color, thickness, lines, points]
  )

  const isDrawing: boolean = points.length > 0

  const addPoint: (point: Point) => void = useCallback(
    (newPoint: Point) => setPoints([...points, newPoint]),
    [points]
  )

  const finishLine: () => void = useCallback(
    () => {
      if (points.length > 1) setLines(allLines)
      setPoints([])
    }, [allLines, points]
  )

  const reset: () => void = useCallback(() => setLines([]), [])

  const undo: () => void = useCallback(() => setLines(lines.slice(0, -1)), [lines])

  return {
    isDrawing,
    lines: allLines,
    addPoint,
    finishLine,
    reset,
    undo,
  }
}

export default useDrawArea
