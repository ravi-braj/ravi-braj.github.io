import * as React from "react";
import {Fractal} from "./Fractal";
import {Gosper} from "./FractalConfigs";

export class Splash extends React.PureComponent<{}, {}> {

    public render() {
        return (
            <div className="splash-container">
                <div className="splash-logo"><Fractal fractalConfig={new Gosper()} /></div>
                <div className="splash-title">
                    <h1>My name is Ravi</h1>
                    <h2>Full stack software engineer</h2>
                </div>
            </div>
        )
    }
}