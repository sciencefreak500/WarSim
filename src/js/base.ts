import { Engine } from "./engine.js";
import { AnimEngine } from './animEngine.js';

export class Base {

    engine: any;
    animEngine: AnimEngine;
    uuid:string;
    size: number;
    teamIndex: number;
    location: {x: number, y: number};
    attackDamage: number;
    angle: number;
    
    constructor() {
        this.engine = Engine;
        this.size = 32;
        this.location = {x: 0, y: 0};
        this.teamIndex = 0;
        this.angle = 0;
        this.animEngine = new AnimEngine(this);
        this.addToStack();
    }

    addToStack() {
        const unitUUID = this.engine.generateUUID();
        this.uuid = unitUUID;
        this.engine.unitStack[unitUUID] = this;
    }

    protected tick() { 
        // if out of bounds, remove unit
        if (this.location.y > this.engine.canvas.height || this.location.y < 0) {
            this.destroy();
        }
    }

    protected destroy() {
        delete this.engine.unitStack[this.uuid];
    }
}
