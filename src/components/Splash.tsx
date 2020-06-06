import * as React from "react";
import {Fractal} from "./Fractal";
import {Gosper} from "./FractalConfigs";
import {DivScalar} from "./DivScalar";

export class Splash extends React.PureComponent<{}, {}> {

    public render() {
        return (
            <div className="splash-container">
                <div className="splash-logo"><DivScalar><Fractal fractalConfig={new Gosper()} /></DivScalar></div>
                <div className="splash-title">
                    <h1>My name is Ravi</h1>
                    <h2>Full stack software engineer at <a href="#/experience">Palantir</a></h2>
                </div>
            </div>
        )
    }
}