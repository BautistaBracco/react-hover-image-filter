import { useEffect } from 'react'

import { useRef } from 'react'

export function useHoldPress () {
  const timerRef = useRef<NodeJS.Timeout>()
  const isPaintingRef = useRef<boolean>()

  // if user is holding down the mouse button for 500ms add more time to the timer

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])
  // create a hook that detects if the user is holding down the mouse button in a component and returns a boolean value that is true if the user is holding down the mouse button and false if the user is not holding down the mouse button and use that hook in the deleteGreyscaleOnEvent.ts file to detect if the user is holding down the mouse button and if the user is holding down the mouse button then delete the greyscale on the image and if the user is not holding down the mouse button then do not delete the greyscale on the image

  function handleOnMouseDown () {
    isPaintingRef.current = true
  }

  function handleOnMouseUp () {
    isPaintingRef.current = false
  }

  function handleOnMouseLeave () {
    isPaintingRef.current = false
  }

  return {
    handlers: {
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,

      onMouseLeave: handleOnMouseLeave
    },
    isPaintingRef
  }
}
