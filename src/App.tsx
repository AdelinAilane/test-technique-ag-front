import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppDrawer from "./components/AppDrawer/AppDrawer";
import MiniDrawer from "./components/AppDrawer/AppDrawer";
import Typography from "@mui/material/Typography";
import {BrowserRouter, createBrowserRouter} from "react-router-dom";
import AppRoutes from "./core/routes/Routes";

function App() {
  const pageTitle = 'pageTitle';
//  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <BrowserRouter>
          <MiniDrawer pageTitle={pageTitle} >
              <>
                    <AppRoutes></AppRoutes>

                      {/*
                      <Typography> AAAAAAAAH</Typography>
                      <Typography paragraph>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                          sapien faucibus et molestie ac.
                      </Typography>
                      <Typography paragraph>
                          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                          posuere sollicitudin aliquam ultrices sagittis orci a.
                      </Typography>
                      */}
            </>
          </MiniDrawer>
      </BrowserRouter>

      /*
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>

      */
  );
}

export default App;
