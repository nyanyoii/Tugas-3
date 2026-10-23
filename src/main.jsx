// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import Kalkulator from './Kalkulator/Kalkulator.jsx'
// import Dashboard from './KosPaket/pages/Dashboard.jsx'
// import AdminDashboard from './KosPaket/pages/AdminDashboard.jsx'
// import UserDashboard from './KosPaket/pages/UserDashboard.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Dashboard />
//   </StrictMode>,
// )





import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
