import * as React from "react";
import {Dragon, FractalConfig, Gosper, Tree, Triangle} from "./FractalConfigs";

interface IFractalConfigurationPanelProps {
    fractal: FractalConfig;
    setFractalFunc: (fractal: FractalConfig) => void;
}

const fractals = [
    {
        name: "Tree",
        fractal: new Tree(),
    },
    {
        name: "Dragon",
        fractal: new Dragon(),
    },
    {
        name: "Gosper",
        fractal: new Gosper(),
    },
    {
        name: "Triangle",
        fractal: new Triangle(),
    }
];

export class FractalConfigurationPanel extends React.PureComponent<IFractalConfigurationPanelProps, {}> {


    renderFractalSelector() {
        return (
            <div className="fractal-selector">
                {fractals.map(x => this.renderFractalTile(x.name, x.fractal))}
            </div>
        )
    }

    renderFractalTile(name: string, fractal: FractalConfig) {
        return (
            <div
                className={"fractal-selector-tile"}
                onMouseDown={() => {
                    console.log("SETTING FRACTAL TO", name)
                    this.props.setFractalFunc(fractal)}}
                key={name}
            >
                <h3>{name}</h3>
            </div>
        )
    }

    renderFractalInfo() {
        return (
            <div className="fractal-info">
                <div>
                    <h3>Starting State</h3>{this.props.fractal.fractalSeed.join("")}
                </div>
                <div>
                    <h3>Rules</h3>{this.props.fractal.transformMap}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={"fractal-configuration-panel-container"}>
                {this.renderFractalSelector()}
                {this.renderFractalInfo()}
            </div>
        )
    }
}