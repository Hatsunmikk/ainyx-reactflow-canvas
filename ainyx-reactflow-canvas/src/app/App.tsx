import { useState } from 'react'
import '/src/index.css'
import '/src/App.css'
import { FlowCanvas } from "@/canvas/FlowCanvas";
import { RightPanel } from "@/layout/RightPanel";


function App() {
 

  return (
    <div className="flex h-screen">
    <main className="flex-1 relative">
      <FlowCanvas />
    </main>
    <RightPanel />
    </div>
  )
}

export default App
