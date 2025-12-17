import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from "@/app/Providers";
import './index.css'
import App from './app/App.tsx'
import "@xyflow/react/dist/style.css"

//start msw in development only
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start();
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
    <App />
    </Providers>
  </React.StrictMode>,
)
