import React, { CSSProperties, FC } from 'react'

import { Lines, Point } from 'types'

type Props = {
  lines: Lines
}

const style: CSSProperties = {
  height: '100%',
  width: '100%',
}

const pointsToString = (points: Point[]): string =>
  'M ' + points.map(point => `${point.x} ${point.y}`).join(' L ')

const Drawed: FC<Props> = ({ lines }) => (
  <svg style={style}>
    {lines.map(({ color, points, thickness }, index) =>
      <path
        key={index}
        d={pointsToString(points)}
        fill="none"
        strokeLinecap="round"
        stroke={color}
        strokeWidth={thickness}
      />
    )}
  </svg>
)

export default Drawed
