import React from 'react';
import {Splash} from './components/Splash'
import {Gallery} from "./components/Gallery";
import {Fractal} from "./components/Fractal";
import {Gosper} from "./components/FractalConfigs";
import {Parallax} from "./components/Parallax";
import {Navbar} from "./components/NavBar";
import {Sidebar} from "./components/Sidebar";

function App() {
  return (
      <div className="App">
          <Navbar/>
          <Splash/>
          <Gallery/>
          <div className="background">
              <Parallax scrollProportion={0.4} className="fractal">
                  <Fractal fractalConfig={new Gosper()} trace={true}/>
              </Parallax>
          </div>
      </div>
  );
}

export default App;
