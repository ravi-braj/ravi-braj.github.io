import * as React from "react"
import {ReactComponent as Chevron} from "../assets/chevron-right.svg"
import {BrowserRouter, RouteComponentProps, useHistory, withRouter} from "react-router-dom";


interface ISideBarProps extends RouteComponentProps {
    handleClose: () => void;
}

class Sidebar extends React.PureComponent<ISideBarProps, {}> {
    renderTile(title: string, uri: string) {
        return (
            <div className="sidebar-tile" onMouseDown={()=>{
                this.props.handleClose()
                this.props.history.push(uri)
            }}>
                <span className="sidebar-title">{title}</span>
            </div>
        )
    }

    render() {
        return (
            <div className="sidebar-container">
                <Chevron className="sidebar-close" onMouseDown={() => this.props.handleClose()}/>
                <div className="sidebar-tiles">
                    {this.renderTile("Home", "/")}
                    {this.renderTile("Experience", "/experience")}
                    {this.renderTile("Interests", "/interests")}
                    {this.renderTile("Fractals", "/fractals")}
                </div>
            </div>
        );
    }
}

export default withRouter(Sidebar);
