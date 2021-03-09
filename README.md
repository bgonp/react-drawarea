# React DrawArea

Simple package that provide React components to draw lines using mouse or touch events.

## Demo

Take a look to this tool in action [**HERE**](https://drawarea.vercel.app/).

## Prerequisites

- React >= 16.8

## Installation

`npm install react-drawarea --save`

## Usage

This package provides to your application `DrawArea` component and `DrawContext` context.

`DrawArea` component can have several optional props:
- **className**: To handle styles, simple. Default: `''`.
- **color**: Color of lines. It can be an hex color or a named color. Default: `#000000`.
- **disabled**: Prevent new lines to be drawed. It still shows existing lines. Default: `false`.
- **hidden**: Hide whole component. Lines are still stored to be able to show them again until you unmount component or use reset feature. Default: `false`.
- **thickness**: Lines thickness (in pixels). Default: `10`.

`DrawArea` component can have also children components. This component will be able to access some features by using `useContext` hook and `DrawContext` (see samples below). Properties accesible by using this context are:
- **lines**: An array of current lines. Each line is an array of points. Each point is an object containing properties `x` and `y`, both of them numbers.
- **isDrawing**: A boolean which is `true` while a line is being drawn. Otherwise it is `false`.
- **reset**: This method removes all lines when it is called.
- **undo**: This method removes last drawed line when it is called.

Keep in mind this component **has no styles**, so you should set at least its size to be able to use it. **You should handle this by providing a className and setting styles to it**. Same if you want to be able to draw over some other element or something special. **Be creative!** 😉

### Simple:
```javascript
import * as React from 'react'
import { DrawArea } from 'react-drawarea'

export const Sample = () => <DrawArea className="drawarea" />
```

### With options:
```javascript
import * as React from 'react'
import { DrawArea } from 'react-drawarea'

export const Sample = () => {
  const [paused, setPaused] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)

  return (
    <>
      <DrawArea
        className="drawarea"
        color="#ba324f"
        disabled={paused}
        hidden={hidden}
        thickness={20}
      />
      <button onClick={() => setPaused(paused => !paused)}>PAUSE</button>
      <button onClick={() => setHidden(hidden => !hidden)}>HIDE</button>
    </>
  )
}
```

### Reset and undo buttons:
```javascript
import * as React from 'react'
import { DrawArea, DrawContext } from 'react-drawarea'

const Buttons = () => {
  const { reset, undo } = React.useContext(DrawContext)

  return (
    <>
      <button onClick={reset}>RESET</button>
      <button onClick={undo}>UNDO</button>
    </>
  )
}

export const Sample = () => (
  <DrawArea className="drawarea">
    <img src="background.png" />
    <Buttons />
  </DrawArea>
)
```
