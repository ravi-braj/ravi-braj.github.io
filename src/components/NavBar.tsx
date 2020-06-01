import * as React from "react";
import {ReactComponent as Home} from "../assets/home.svg";
import {ReactComponent as Grid} from "../assets/grid.svg";
import {Sidebar} from "./Sidebar";

interface INavbarState {
    sidebar: boolean;
}

export class Navbar extends React.PureComponent<{}, INavbarState> {
    constructor(props: {}) {
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