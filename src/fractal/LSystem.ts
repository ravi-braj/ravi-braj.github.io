
import * as _ from 'lodash';




/**
 *  T = set of characters
 */
export class LSystem<T> {
    private currentState_: Array<T>;
    readonly transformMap_: Map<T, Array<T>>;

    constructor(initState: Array<T>, transforms: Map<T, Array<T>>) {
        this.currentState_ = initState;
        this.transformMap_ = transforms;
    }

    currentState(): Array<T> {
        return _.cloneDeep(this.currentState_);
    }

    nextState(): Array<T> {
        this.currentState_ = this.currentState_.flatMap(x => this.transformMap_.get(x) || x);

        return this.currentState();
    }

    applyIterations(n: number): Array<T> {
        for (let i = 0; i < n; i ++) {
            this.nextState();
        }
        return this.currentState();
    }
}