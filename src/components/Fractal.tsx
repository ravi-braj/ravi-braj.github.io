import * as React from "react";
import {RefObject} from "react";
import p5 from 'p5';
import {LSystem} from "../fractal/LSystem";
import {Display, FractalConfig, Justify, Line, RatioPosition} from "./FractalConfigs";


interface IFractalProps {
    fractalConfig: FractalConfig,
    trace?: boolean,
}

export class Fractal extends React.PureComponent<IFractalProps, {}> {
    private readonly myRef: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private renderer: p5 | undefined;
    private fractal: Array<String>;
    private frameGenerator: any;
    private queue: Array<Array<Line>>;
    private dimensions: Array<number> | undefined;



    constructor(props: IFractalProps) {
        super(props)
        this.myRef = React.createRef()
        this.fractal = this.getFractal(this.props.fractalConfig.iterations).reverse();
        this.queue = new Array<Array<Line>>();
    }


    private getFractal(iterations: number): Array<String> {
        let fractalGenerator: LSystem<String> = new LSystem<String>(
            this.props.fractalConfig.fractalSeed, this.props.fractalConfig.transformMap);
        return fractalGenerator.applyIterations(iterations);
    }

    private getDimensions(queue: Array<Array<Line>>): Array<number> {
        let minX = queue.flat().map(x => Math.min(x.x0, x.x1)).reduce((prev, curr) => Math.min(prev, curr));
        let maxX = queue.flat().map(x => Math.max(x.x0, x.x1)).reduce((prev, curr) => Math.max(prev, curr));
        let minY = queue.flat().map(x => Math.min(x.y0, x.y1)).reduce((prev, curr) => Math.min(prev, curr));
        let maxY = queue.flat().map(x => Math.max(x.y0, x.y1)).reduce((prev, curr) => Math.max(prev, curr));
        return [minX, maxX, minY, maxY];
    }

    private rescale(rescale: RatioPosition): void {
        if(!this.dimensions || !this.myRef.current) return;
        let boundingBox = this.myRef.current.getBoundingClientRect();
        let targetWidth = boundingBox.width*rescale.x;
        let targetHeight = boundingBox.height*rescale.y;
        let rescaleX = targetWidth/(this.dimensions[1] - this.dimensions[0]);
        let rescaleY = targetHeight/(this.dimensions[3] - this.dimensions[2]);
        this.queue = this.queue.map(layer => layer.map(line => {
            line.x0 *= rescaleY;
            line.x1 *= rescaleY;
            line.y0 *= rescaleY;
            line.y1 *= rescaleY;
            return line;
        }))
        this.dimensions = this.getDimensions(this.queue);
        return;
    }

    private translateLine(line: Line, display: Display): Line {
        if(!this.dimensions || !this.myRef.current) return line;
        let boundingBox = this.myRef.current.getBoundingClientRect();
        let positionX = (boundingBox.width - this.dimensions[1] + this.dimensions[0]);
        let positionY = (boundingBox.height - this.dimensions[3] + this.dimensions[2]);

        switch (display.justifyX) {
            case Justify.CENTER:
                positionX *= 0.5;
                break;
            case Justify.END:
                break;
            case Justify.START:
                positionX = 0;
                break;
            default:
                break;
        }
        switch (display.justifyY) {
            case Justify.CENTER:
                positionY *= 0.5;
                break;
            case Justify.END:
                break;
            case Justify.START:
                positionY = 0;
                break;
            default:
                break;
        }
        if (display.ratioShift) {
            positionX += boundingBox.width*display.ratioShift.x;
            positionY += boundingBox.height*display.ratioShift.y;
        }

        let translateX = positionX - this.dimensions[0];
        let translateY = positionY - this.dimensions[2];
        line.x0 += translateX;
        line.x1 += translateX;
        line.y0 += translateY;
        line.y1 += translateY;
        return line;
    }


    private *drawNextFrame(renderer: p5 | undefined, queue: Array<Array<Line>>) {
        if(!renderer) return;
        if(this.props.fractalConfig.display.rescale) this.rescale(this.props.fractalConfig.display.rescale);
        let flatQueue = queue.flat();
        let count = 0;
        for(let line of flatQueue) {
            line = this.translateLine(line, this.props.fractalConfig.display);
            renderer.strokeWeight(1);
            renderer.stroke("#011936")
            renderer.line(line.x0, line.y0, line.x1, line.y1)
            count += 1;
            if(count%this.props.fractalConfig.linesPerFrame === 0) {
                yield;
            }
        }
    }

    private drawTrace(renderer: p5 | undefined, queue: Array<Array<Line>>) {
        if(!renderer) return;
        if(this.props.fractalConfig.display.rescale) this.rescale(this.props.fractalConfig.display.rescale);
        for(let line of queue.flat()) {
            line = this.translateLine(line, this.props.fractalConfig.display);
            console.log("DRAWING TRACE")
            renderer.strokeWeight(1);
            renderer.stroke("#CCD0D5")
            renderer.line(line.x0, line.y0, line.x1, line.y1)
        }
    }

    private renderEngine = (renderer: p5) => {
        renderer.setup = () => {
            let container = window.document.getElementById("fractal")
            if(container) {
                renderer.createCanvas(container.getBoundingClientRect().width, container.getBoundingClientRect().height);
            }

            let state = this.props.fractalConfig.startingState(window)
            while (this.fractal.length) {
                let op = this.fractal.pop();
                if (renderer && op && this.props.fractalConfig.operations.has(op)) {
                    let operation = this.props.fractalConfig.operations.get(op);
                    if (operation) operation(state, this.queue);
                }
            }
            this.dimensions = this.getDimensions(this.queue);
            let totalLines: number = this.queue.reduce((total, curr) => total + curr.length, 0)
            renderer.frameRate(this.props.fractalConfig.frameRate)
            this.drawTrace(renderer, this.queue);

        }

        renderer.draw = () => {
            this.frameGenerator.next();
            renderer.angleMode("degrees")
            renderer.rotate(30)
        }
    }

    componentDidMount(): void {
        this.renderer = new p5(this.renderEngine, this.myRef.current as HTMLElement)
        this.frameGenerator = this.drawNextFrame(this.renderer, this.queue)
    }

    render() {

        return (
                <div
                    id="fractal" className="fractal" ref={this.myRef}
                />
        )
    }
}