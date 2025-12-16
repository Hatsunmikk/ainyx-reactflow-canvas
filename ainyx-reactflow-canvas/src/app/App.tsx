import { useState } from 'react'
import '/src/index.css'
import '/src/App.css'
import { FlowCanvas } from "@/canvas/FlowCanvas";


function App() {
 

  return (
    <main className="flex-1 relative">
      <FlowCanvas />
    </main>
  )
}

export default App
