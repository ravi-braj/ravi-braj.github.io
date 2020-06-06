import React from 'react';
import {Splash} from './components/Splash'
import {Gallery} from "./components/Gallery";
import Navbar from "./components/NavBar";
import {
    HashRouter,
    Route,
} from "react-router-dom";

function App() {
  return (
      <div className="App">
          <HashRouter>
              <Navbar/>
              <Route exact path="/">
                  <Splash/>
              </Route>
              <Route path="/experience">
                  <Gallery/>
              </Route>
          </HashRouter>
      </div>
  );
}

export default App;
