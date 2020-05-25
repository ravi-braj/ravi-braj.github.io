import * as React from "react";

interface IGalleryTile {
    name: string,
    logo: string,
    description: string,
}

export class GalleryTile extends React.PureComponent<IGalleryTile, {}> {

    public render() {
        return (
            <div className="gallery-tile-container">
                <div className="gallery-tile-logo-container">
                    <div className={this.props.logo + " gallery-tile-logo"}/>
                </div>
                <div className="gallery-tile-text">
                    <h2>{this.props.name}</h2>
                    <span>{this.props.description}</span>
                </div>
            </div>
        )
    }
}