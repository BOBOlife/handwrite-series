import React, { useState } from "react"

export function Hello(){
  const [count, setCount] = useState(0)
  return (
    <>
    <h1>Hello Page, 这是服务端渲染的，现在是 {count}</h1>
    <button onClick={() => setCount(count + 1)}>增加+1</button>
    </>
  )
}