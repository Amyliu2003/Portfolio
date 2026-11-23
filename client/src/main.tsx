import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { ToolsIndexPage } from "./tools/pages/ToolsIndexPage.tsx";
import { ToolDetailPage } from "./tools/pages/ToolDetailPage.tsx";
import { ToolRuntimePage } from "./tools/pages/ToolRuntimePage.tsx";
import { WorksPage } from "./pages/WorksPage.tsx";
import { WorkDetailPage } from "./pages/WorkDetailPage.tsx";
import "./index.css";
import "./custom.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/works" element={<WorksPage />} />
      <Route path="/works/:project_name" element={<WorkDetailPage />} />
      <Route path="/tools" element={<ToolsIndexPage />} />
      <Route path="/tools/:name/:id" element={<ToolDetailPage />} />
      <Route path="/tools/runtime/:slug" element={<ToolRuntimePage />} />
    </Routes>
  </BrowserRouter>
);