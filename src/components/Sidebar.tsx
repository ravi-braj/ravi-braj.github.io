import * as React from "react"
import {ReactComponent as Chevron} from "../assets/chevron-right.svg"

interface ISideBarProps {
    handleClose: () => void;
}

export class Sidebar extends React.PureComponent<ISideBarProps, {}> {

    renderTile(title: string) {
        return (
            <div className="sidebar-tile">
                <span className="sidebar-title">{title}</span>
            </div>
        )
    }

    render() {
        return (
            <div className="sidebar-container">
                <Chevron className="sidebar-close" onMouseUp={() => this.props.handleClose()}/>
                <div className="sidebar-tiles">
                    {this.renderTile("Home")}
                    {this.renderTile("Experience")}
                    {this.renderTile("Interests")}
                    {this.renderTile("Fractals")}
                </div>
            </div>
        );
    }
}