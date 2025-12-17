# Reasoning & Design Decisions

This document explains how the app was designed, why certain decisions were made, and how the system works end to end.

---

## 1. Overall Approach

The goal was to build a clean, predictable, and extensible canvas-based UI that allows users to visualize and edit application architectures.

I focused on:

- Clear separation of concerns
- Predictable state updates
- Minimal prop drilling
- Strong TypeScript guarantees

---

## 2. Canvas & Graph Management

**React Flow** was chosen for its mature interaction model and extensibility.

Key decisions:

- Nodes and edges are managed using `useNodesState` and `useEdgesState`
- Custom node renderers are registered via `nodeTypes`
- All mutations (add, delete, update) are handled immutably

This ensures predictable behavior and easy debugging.

---

## 3. State Management

**Zustand** is used for global UI state such as:

- Selected app
- Selected node
- Inspector visibility
- Active inspector tab
- Command-style actions (e.g., “add node”)

This avoids prop drilling and keeps React Flow logic isolated from UI concerns.

---

## 4. Data Fetching

**TanStack Query** handles graph data fetching:

- Loading and error states are explicitly handled
- Mock APIs simulate async behavior
- Caching avoids unnecessary re-fetching

This mirrors real-world frontend data patterns without backend complexity.

---

## 5. Node Inspector

The inspector panel is tightly synchronized with the canvas:

- Selecting a node updates the inspector
- Inspector changes update the node immediately
- Desktop and mobile layouts share the same logic

This bidirectional sync was a key UX focus.

---

## 6. Styling & Theming

- Tailwind CSS with CSS variables enables light/dark theming
- Dark mode is default to match the intended visual style
- Nodes use subtle shadows, consistent spacing, and clear hierarchy
- Edges remain visible in both themes and emphasize on hover

---

## 7. Trade-offs & Future Improvements

Trade-offs:

- Mock APIs are used instead of a real backend
- Persistence is not implemented

Possible improvements:

- Save/load graph state
- Edge labels and types
- Grouping or collapsing nodes
- Real backend integration

---

## 8. Summary

This project demonstrates:

- Strong React and TypeScript fundamentals
- Thoughtful UI and UX decisions
- Clean state management
- Correct handling of interactive canvas behavior

The structure is designed to scale without major refactors.
