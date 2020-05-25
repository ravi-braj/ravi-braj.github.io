import React from 'react';
import {Splash} from './components/Splash'
import {Gallery} from "./components/Gallery";
import {Fractal} from "./components/Fractal";
import {Dragon, Gosper, Tree, Triangle} from "./components/FractalConfigs";
import {Parallax} from "./components/Parallax";

function App() {
  return (
      <div className="App">
          <Splash/>
          <Gallery/>
          <div className="background">
              <Parallax scrollProportion={0.4} className="fractal">
                  <Fractal fractalConfig={new Gosper} trace={true}/>
              </Parallax>
          </div>
      </div>
  );
}

export default App;
