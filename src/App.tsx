import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppDrawer from "./components/AppDrawer/AppDrawer";
import MiniDrawer from "./components/AppDrawer/AppDrawer";
import Typography from "@mui/material/Typography";
import {BrowserRouter, createBrowserRouter} from "react-router-dom";
import AppRoutes from "./core/routes/Routes";

function App() {
  const pageTitle = '';

  return (
      <BrowserRouter>
          <MiniDrawer pageTitle={pageTitle} >
              <>
                    <AppRoutes></AppRoutes>
              </>
          </MiniDrawer>
      </BrowserRouter>
  );
}

export default App;
