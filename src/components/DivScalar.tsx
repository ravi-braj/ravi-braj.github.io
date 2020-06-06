import * as React from "react";
import {RefObject} from "react";
import {ReactNode} from "react";

interface IDivScalarState {
    scalar: number,
}

interface IDivScalarProps {
    children?: ReactNode,
    className?: string
}

export class DivScalar extends React.PureComponent<IDivScalarProps, IDivScalarState> {
    domRef: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    initialWidth?: number;
    initialHeight?: number;

    constructor(props: IDivScalarProps) {
        super(props);
        this.state = {
            scalar: 1
        };
    }

    handleResize() {
        if (!this.domRef.current || !this.initialWidth || !this.initialHeight) {
            console.log("no element", this.initialWidth, this.initialHeight, this.domRef)
            return
        }
        let boundingBox = this.domRef.current.getBoundingClientRect();
        let scalar = Math.min(boundingBox.width/this.initialWidth, boundingBox.height/this.initialHeight);
        scalar = boundingBox.width/this.initialWidth;
        this.setState({scalar});
        console.log("dims", boundingBox.width, boundingBox.height)
        console.log("SCALE", scalar);
    }

    componentDidMount(): void {
        if (!this.domRef.current) throw new Error("No element");
        window.addEventListener('resize', () => this.handleResize());
        let boundingBox = this.domRef.current.getBoundingClientRect();
        this.initialHeight = boundingBox.height;
        this.initialWidth = boundingBox.width;
        console.log("INITIAL", this.initialHeight, this.initialWidth);
    }

    render() {
        let style = {
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
        }
        let innerStyle = {
            transform: `scale(${this.state.scalar}, ${this.state.scalar})`,
            width: this.initialWidth ? `${this.initialWidth}px` : '100%',
            height: this.initialHeight ? `${this.initialHeight}px` : '100%',
            transformOrigin: 'center left'
        }
        return (
            <div className={this.props.className} ref={this.domRef} style={style}>
                <div style={innerStyle}>{this.props.children}</div>
            </div>
        )
    }
}