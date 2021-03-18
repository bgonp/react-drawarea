import { useCallback, useMemo, useState } from 'react'

import { Line, Lines, Point } from 'types'

type UseDrawAreaType = {
  isDrawing: boolean
  lines: Lines
  addPoint: (point: Point) => void
  finishLine: () => void
  reset: () => void
  undo: () => void
}

const useDrawArea = (): UseDrawAreaType => {
  const [lines, setLines] = useState<Lines>([])
  const [newLine, setNewLine] = useState<Line>([])

  const allLines: Lines = useMemo(
    () => newLine.length === 0 ? lines : [...lines, newLine],
    [lines, newLine]
  )

  const isDrawing: boolean = newLine.length > 0

  const addPoint = useCallback(
    (newPoint: Point) => setNewLine([...newLine, newPoint]),
    [newLine]
  )

  const finishLine = useCallback(
    () => {
      if (newLine.length > 1) setLines(allLines)
      setNewLine([])
    }, [allLines, newLine]
  )

  const reset = useCallback(() => setLines([]), [])

  const undo = useCallback(() => setLines(lines.slice(0, -1)), [lines])

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
