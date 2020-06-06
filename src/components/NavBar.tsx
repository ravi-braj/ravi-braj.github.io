import * as React from "react";
import {ReactComponent as Grid} from "../assets/grid.svg";
import Sidebar from "./Sidebar";
import {RouteComponentProps, withRouter} from "react-router";

interface INavbarState {
    sidebar: boolean;
}

class Navbar extends React.PureComponent<RouteComponentProps, INavbarState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            sidebar: false
        }
    }

    render() {
        return (
            <div className="navbar-container">
                <div className="navbar-bar">
                    <Grid className="navbar-button" onMouseDown={() => this.setState({sidebar: true})}/>
                </div>
                <div className={`navbar-sidebar-container ${this.state.sidebar ? "" : "hidden"}`}>
                    <Sidebar handleClose={() => {this.setState({sidebar: false})}}/>
                </div>
            </div>
        )
    }
}

export default withRouter(Navbar);