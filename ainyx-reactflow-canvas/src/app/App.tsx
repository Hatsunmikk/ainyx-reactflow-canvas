import '/src/index.css'
import '/src/App.css'
import { FlowCanvas } from "@/canvas/FlowCanvas";
import { RightPanel } from "@/layout/RightPanel";
import { AppLayout } from "./AppLayout";


function App() {
 

  return (
    <div className="flex h-screen">
    <main className="flex-1 relative">
      <AppLayout>
      <FlowCanvas />
      </AppLayout>
    </main>
    <RightPanel />
    </div>
  )
}

export default App
