# React Drawable

Simple package that provide React components to draw lines using mouse or touch events.

## Prerequisites

- React >= 16.8

## Install

`npm install react-drawable --save`

## Usage

Keep in mind this component **has no styles**, so you should set at least its size to be able to use it. **You should handle this by providing a className and setting styles to it**. Same if you want to be able to draw over some other element or something special. **Be creative!** 😉

### Simple:
```javascript
import * as React from 'react'
import { DrawProvider } from 'react-drawable'

export const Sample = () => <DrawProvider className="drawable" />
```

### With options:
```javascript
import * as React from 'react'
import { DrawProvider } from 'react-drawable'

export const Sample = () => {
  const [paused, setPaused] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)

  return (
    <>
      <DrawProvider
        className="drawable"
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
import { DrawContext, DrawProvider } from 'react-drawable'

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
  <DrawProvider className="drawable">
    <img src="background.png" />
    <Buttons />
  </DrawProvider>
)
```