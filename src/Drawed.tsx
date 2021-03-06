import React, { CSSProperties, FC } from 'react'

import { Lines, Line } from './types'

type Props = {
  color: string
  lines: Lines
  thickness: number
}

const style: CSSProperties = {
  height: '100%',
  width: '100%',
}

const lineToString = (line: Line): string =>
  'M ' + line.map(point => `${point.x} ${point.y}`).join(' L ')

const Drawed: FC<Props> = ({ color, lines, thickness }) => (
  <svg style={style}>
    {lines.map((line, index) =>
      <path
        key={index}
        d={lineToString(line)}
        fill='none'
        strokeLinecap="round"
        stroke={color}
        strokeWidth={thickness}
      />,
    )}
  </svg>
)

export default Drawed
