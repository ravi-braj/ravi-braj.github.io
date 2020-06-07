import * as React from "react";
import {Fractal} from "./Fractal";
import {Dragon, FractalConfig, Tree} from "./FractalConfigs";
import {DivScalar} from "./DivScalar";
import {FractalConfigurationPanel} from "./FractalConfigurationPanel";

interface IFractalExplorerState {
    fractal: FractalConfig,
}

export class FractalExplorer extends React.PureComponent<{}, IFractalExplorerState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            fractal: new Tree(),
        }
    }

    setFractal(fractal: FractalConfig) {
        this.setState({fractal})
    }

    render() {
        const currFractal = this.state.fractal;
        return (
            <div className="fractal-explorer-container">
                <h1>Fractal Explorer</h1>
                <FractalConfigurationPanel
                    fractal={this.state.fractal}
                    setFractalFunc={(fractal) => this.setFractal(fractal)}
                />
                <div key={Math.random()} className="fractal-container">
                    <DivScalar><Fractal fractalConfig={currFractal} /></DivScalar>
                </div>
            </div>
        )
    }
}