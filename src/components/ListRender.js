import React, { useRef, useState } from "react";

const items = Array.from({length: 50}, (_,i) => ({
  id: i+1,
  title: `Item ${i+1}`,
  description: "Lorem ipsum dolor sit amet."
}))

const ITEM_HEIGHT = 100
const CONTAINER_HEIGHT = 500



const ListRender = () => {
  const containerRef = useRef(null)
  const [visRange, setVisRange] = useState({ start: 0, end: Math.ceil(CONTAINER_HEIGHT/ITEM_HEIGHT)})

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop
    const start = Math.floor(scrollTop/ITEM_HEIGHT)
    const visibleCount = Math.ceil(CONTAINER_HEIGHT/ITEM_HEIGHT)

    setVisRange({
      start, end: Math.min(start + visibleCount+1, items.length)
    })
  }

  const visibleItems = items.slice(visRange.start, visRange.end)
  const topSpace = visRange.start * ITEM_HEIGHT
  const bottomSpace = (items.length - visRange.end) * ITEM_HEIGHT


  return (
    <div ref={containerRef} onScroll={handleScroll} style={{
      height: "500px",
      overflowY: "auto",
      border: "1px solid #ccc"
    }}>
      <div style={{height: topSpace}} />
      {
        visibleItems.map(item => <div key={item.id}
          style={{
            height: `${ITEM_HEIGHT}px`,
            padding: "15px 20px",
            boxSizing: "border-box"
          }}
        >
            <h2 style={{margin: 0}}>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ) 
      }
      <div style={{height: bottomSpace}} />
    </div>
  )
}

export default ListRender