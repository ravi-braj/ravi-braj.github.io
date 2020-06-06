import React from 'react';
import {Splash} from './components/Splash'
import {Gallery} from "./components/Gallery";
import Navbar from "./components/NavBar";
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

function App() {
  return (
      <div className="App">
          <Router>
              <Navbar/>
              <Route exact path="/">
                  <Splash/>
              </Route>
              <Route path="/experience">
                  <Gallery/>
              </Route>
          </Router>
      </div>
  );
}

export default App;
