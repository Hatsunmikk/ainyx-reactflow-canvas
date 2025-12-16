import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from "@/app/Providers";
import './index.css'
import App from './app/App.tsx'
import "@xyflow/react/dist/style.css"


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
    <App />
    </Providers>
  </React.StrictMode>,
)
