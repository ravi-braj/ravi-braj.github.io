import * as React from "react";
import {GalleryTile} from "./GalleryTile";
import {experiences} from "../assets/experience";

export class Gallery extends React.PureComponent<{}, {}> {

    renderExperiences() {
        return experiences.map((exp, i) => {
            return (
                <GalleryTile
                    name={exp["name"]}
                    logo={exp["logo"]}
                    description={exp["description"]}
                    key={i}
                />
            )
        })

    }

    public render() {
        return (
            <div className="gallery-container">
                {this.renderExperiences()}
            </div>
        )
    }
}