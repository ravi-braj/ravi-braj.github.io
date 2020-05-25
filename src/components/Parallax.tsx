import * as React from "react";
import {ReactChildren, ReactNode} from "react";
import {RefObject} from "react";

interface IParallaxProps {
    children: ReactNode,
    scrollProportion: number,
    className: string
}
interface IParallaxState {
    scrollPositionY: number,
    top: number,
}

export class Parallax extends React.PureComponent<IParallaxProps, IParallaxState> {
    domRef: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    constructor(props: IParallaxProps) {
        super(props);
    }

    handleScroll() {
        let scrollDiff = window.scrollY - this.state.scrollPositionY;
        console.log(this.domRef);
        let newTop = this.state.top;
        if(this.domRef.current) {
            let diff = (scrollDiff*this.props.scrollProportion)
            newTop = this.state.top - diff;
            this.domRef.current.style.top = newTop + "px";
        }
        this.setState({
            scrollPositionY: window.scrollY,
            top: newTop,
        });

    }

    componentDidMount(): void {
        window.addEventListener('scroll', () => this.handleScroll())
        this.setState({
            scrollPositionY: window.scrollY,
            top: this.domRef.current ? this.domRef.current.getBoundingClientRect().top : 0,
        });
    }

    render() {
        let style = {
            position: "fixed" as "fixed",
        }
        return (
            <div id="parallax" className={this.props.className} ref={this.domRef} style={style}>
                {this.props.children}
            </div>
        )
    }
}