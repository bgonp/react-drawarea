import React, { FC } from 'react'
import * as PropTypes from 'prop-types'

import Drawable from 'components/Drawable'
import Drawed from 'components/Drawed'
import DrawContext from 'contexts/DrawContext'
import useDrawArea from 'hooks/useDrawArea'

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
  const {
    isDrawing,
    lines,
    addPoint,
    finishLine,
    reset,
    undo,
  } = useDrawArea({ color, thickness })

  const content = hidden
    ? null
    : (
        <div className={className}>
          <Drawed lines={lines} />
          {disabled || <Drawable addPoint={addPoint} finishLine={finishLine} />}
        </div>
      )

  if (!children) return content

  return (
    <DrawContext.Provider value={{ isDrawing, lines, reset, undo }}>
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
