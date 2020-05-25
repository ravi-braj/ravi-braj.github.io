import {TreeState} from "../fractal/TreeFractal";

export interface Line {
    x0: number,
    y0: number,
    x1: number,
    y1: number,
}
interface TreeOperation {
    (state: TreeState, queue: Array<Array<Line>>): void
}

export interface RatioPosition {
    x: number,
    y: number,
}

export enum Justify {
    START,
    CENTER,
    END
}

export interface Display {
    ratioShift?: RatioPosition,
    justifyX?: Justify,
    justifyY?: Justify,
    rescale?: RatioPosition,


}

export interface FractalConfig {
    transformMap: Map<String, Array<String>>;
    operations: Map<String, TreeOperation>;
    startingState(window: Window): TreeState;
    fractalSeed: Array<String>;
    iterations: number;
    frameRate: number;
    linesPerFrame: number;
    display: Display;
}


export class Tree implements FractalConfig {
    private length: number = 1.8;
    private angle: number = 30;
    private lengthScaler: number = 1;

    fractalSeed: Array<String> = ["X"];
    iterations: number = 9;
    frameRate: number = 100;
    linesPerFrame: number = 20;
    display: Display = {
        justifyX: Justify.END,
        justifyY: Justify.END,
    }


    startingState(window: Window) {
        let container = window.document.getElementById("fractal")
        let startingPosition = {
            x: container ? 0.65*container.getBoundingClientRect().width : 0,
            y: container ? 1.1*container.getBoundingClientRect().height : 0,
            angle: -Math.PI/2,
            depth: 0,
        }
        this.lengthScaler = container ? container.getBoundingClientRect().width/1800 : 1
        return new TreeState(startingPosition);
    }

    operations: Map<String, TreeOperation> = new Map<String, TreeOperation>([
        ["F", (state, queue) => {
            let x = state.position.x;
            let y = state.position.y;
            state.goForward(this.length*this.lengthScaler)
            if (!queue[state.position.depth]) queue[state.position.depth] = new Array<Line>();
            queue[state.position.depth].push({x0: x, y0: y, x1: state.position.x, y1: state.position.y})
        }],
        ["[", (state, queue) => state.pushState()],
        ["]", (state, queue) => state.restoreState()],
        ["-", (state, queue) => {
            state.turnByDegrees(-this.angle)
        }],
        ["+", (state, queue) => state.turnByDegrees(this.angle)]
    ]);

    transformMap: Map<String, Array<String>> = new Map([
        ["F", "FF".split("")],
        ["X", "F[+X]F[-X]+X".split("")]
    ]);
}

export class Dragon implements FractalConfig {
    /*
    private length: number = 16;
    private angle: number = 90;
    iterations: number = 12;

    fractalSeed: Array<String> = ["F","X"];
    frameRate: number = 30;
    linesPerFrame: number = 50;
     */

    private length: number = 25;
    private angle: number = 90;
    iterations: number = 10;

    fractalSeed: Array<String> = ["F","X"];
    frameRate: number = 30;
    linesPerFrame: number = 10;
    display: Display = {
        justifyX: Justify.CENTER,
        justifyY: Justify.CENTER,
    }

    startingState(window: Window) {
        let container = window.document.getElementById("fractal")
        let startingPosition = {
            x: container ? 0.35*container.getBoundingClientRect().width : 0,
            y: container ? 0.4*container.getBoundingClientRect().height : 0,
            angle: Math.PI + Math.PI/2,
            depth: 0,
        }
        return new TreeState(startingPosition);
    }

    operations: Map<String, TreeOperation> = new Map<String, TreeOperation>([
        ["F", (state, queue) => {
            let x = state.position.x;
            let y = state.position.y;
            state.goForward(this.length)
            if (!queue[state.position.depth]) queue[state.position.depth] = new Array<Line>();
            queue[state.position.depth].push({x0: x, y0: y, x1: state.position.x, y1: state.position.y})
        }],
        ["[", (state, queue) => state.pushState()],
        ["]", (state, queue) => state.restoreState()],
        ["-", (state, queue) => {
            state.turnByDegrees(-this.angle)
        }],
        ["+", (state, queue) => {
            state.turnByDegrees(this.angle)
        }]
    ]);

    transformMap: Map<String, Array<String>> = new Map([
        ["X", "X+YF+".split("")],
        ["Y", "-FX-Y".split("")]
    ]);
}


export class Gosper implements FractalConfig {
    /*
    private length: number = 16;
    private angle: number = 90;
    iterations: number = 12;

    fractalSeed: Array<String> = ["F","X"];
    frameRate: number = 30;
    linesPerFrame: number = 50;
     */

    private length: number = 50;
    private angle: number = 60;
    iterations: number = 3;

    fractalSeed: Array<String> = ["X","F"];
    frameRate: number = 30;
    linesPerFrame: number = 2;
    display: Display = {
        justifyX: Justify.CENTER,
        justifyY: Justify.CENTER,
        ratioShift: {
            x: 0,
            y: 0,
        },
        rescale: {
            x: 0.99,
            y: 0.99
        }
    }

    startingState(window: Window) {
        let container = window.document.getElementById("fractal")
        let startingPosition = {
            x: container ? 0.25*container.getBoundingClientRect().width : 0,
            y: container ? 0.35*container.getBoundingClientRect().height : 0,
            angle: Math.PI + Math.PI/2,
            depth: 0,
        }
        return new TreeState(startingPosition);
    }

    operations: Map<String, TreeOperation> = new Map<String, TreeOperation>([
        ["F", (state, queue) => {
            let x = state.position.x;
            let y = state.position.y;
            state.goForward(this.length)
            if (!queue[state.position.depth]) queue[state.position.depth] = new Array<Line>();
            queue[state.position.depth].push({x0: x, y0: y, x1: state.position.x, y1: state.position.y})
        }],
        ["[", (state, queue) => state.pushState()],
        ["]", (state, queue) => state.restoreState()],
        ["-", (state, queue) => {
            state.turnByDegrees(-this.angle)
        }],
        ["+", (state, queue) => {
            state.turnByDegrees(this.angle)
        }]
    ]);

    transformMap: Map<String, Array<String>> = new Map([
        ["X", "X+YF++YF-FX--FXFX-YF+".split("")],
        ["Y", "-FX+YFYF++YF+FX--FX-Y".split("")]
    ]);
}

export class Triangle implements FractalConfig {
    /*
    private length: number = 16;
    private angle: number = 90;
    iterations: number = 12;

    fractalSeed: Array<String> = ["F","X"];
    frameRate: number = 30;
    linesPerFrame: number = 50;
     */

    private length: number = 2;
    private angle: number = 120;
    iterations: number = 10;

    fractalSeed: Array<String> = ["F","+","F","+","F"];
    frameRate: number = 30;
    linesPerFrame: number = 2000;
    display: Display = {
        justifyX: Justify.CENTER,
        justifyY: Justify.CENTER,
    }

    startingState(window: Window) {
        let container = window.document.getElementById("fractal")
        let startingPosition = {
            x: container ? 0.5*container.getBoundingClientRect().width : 0,
            y: container ? 0.5*container.getBoundingClientRect().height : 0,
            angle: Math.PI + Math.PI/2,
            depth: 0,
        }
        return new TreeState(startingPosition);
    }

    operations: Map<String, TreeOperation> = new Map<String, TreeOperation>([
        ["F", (state, queue) => {
            let x = state.position.x;
            let y = state.position.y;
            state.goForward(this.length)
            if (!queue[state.position.depth]) queue[state.position.depth] = new Array<Line>();
            queue[state.position.depth].push({x0: x, y0: y, x1: state.position.x, y1: state.position.y})
        }],
        ["[", (state, queue) => state.pushState()],
        ["]", (state, queue) => state.restoreState()],
        ["-", (state, queue) => {
            state.turnByDegrees(-this.angle)
        }],
        ["+", (state, queue) => {
            state.turnByDegrees(this.angle)
        }]
    ]);

    transformMap: Map<String, Array<String>> = new Map([
        ["F", "F-F+F".split("")],
    ]);
}