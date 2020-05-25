import * as _ from 'lodash'

/**
 * Types:
 * F(forward), X(nothing), IncAngle, DecAngle, PushState, PopState
 */

export interface Position {
    x: number;
    y: number;
    angle: number;
    depth: number;
}

export class TreeState {

    stack: Array<Position>;
    position: Position;

    constructor(position: Position) {
        this.stack = new Array<Position>();
        this.position = _.cloneDeep(position);
    }

    turnByDegrees(angle: number) {
        //console.log("ANGLE turning from", this.position.angle, "to",  this.position.angle + (angle * Math.PI / 180))
        this.position.angle += (angle * Math.PI / 180);
    }
    goForward(length: number) {
        this.position.x += length * Math.cos(this.position.angle);
        this.position.y += length * Math.sin(this.position.angle);
        this.position.depth += 1;
    }

    pushState() {
        this.stack.push(_.cloneDeep(this.position));
    }

    restoreState() {
        this.position = this.stack.pop() || this.position;
    }
}
