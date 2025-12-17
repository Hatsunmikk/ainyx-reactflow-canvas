# ainyx-reactflow-canvas

An interactive, canvas-based application graph builder built with React, React Flow, and TypeScript.

This project demonstrates clean state management, predictable canvas interactions, and thoughtful UI/UX decisions for graph-based interfaces.

---

## Features

- Interactive graph canvas powered by **React Flow**
- Custom **Service** and **Database** nodes with visual distinction
- Node selection, drag, delete, zoom, and pan
- Inspector panel with live-synced node configuration
- Keyboard shortcuts for fast graph editing (`S`, `D`, `F`)
- Responsive layout with mobile-friendly inspector drawer
- Light and dark theme support (dark by default)

---

## Tech Stack

- **React + TypeScript**
- **React Flow** for canvas rendering and interactions
- **Zustand** for global UI and selection state
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** for styling and theming
- **Vite** for fast development

---

## Project Structure

src/
├─ canvas/ # ReactFlow canvas and graph logic
├─ nodes/ # Custom node renderers
├─ inspector/ # Node inspector panel
├─ layout/ # App layout and panels
├─ store/ # Zustand state
├─ hooks/ # Data fetching hooks
├─ api/ # Mock API layer

---

## Running the Project

```bash
npm install
npm run dev

Available Scripts
dev – start development server

build – production build

preview – preview build

lint – lint codebase

typecheck – TypeScript type checking


Check out reasoning.md for detailed explanations of design decisions, trade-offs, and architecture.
```
