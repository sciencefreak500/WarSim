export var Engine;
(function (Engine) {
    Engine.unitStack = {};
    Engine.playerList = {};
    Engine.spawnable = {};
    Engine.refImages = {};
    function initEngine() {
        this.spawnable = {
            soldier: {
                tally: { player: 0, enemy: 0 },
            },
            ranger: {
                tally: { player: 0, enemy: 0 },
            },
            tent: {
                tally: { player: 0, enemy: 0 },
            }
        };
        this.initRefImages();
    }
    Engine.initEngine = initEngine;
    function initRefImages() {
        const addRefImage = (name, path) => {
            this.refImages[name] = new Image();
            this.refImages[name].src = path;
        };
        addRefImage('coin', '../img/coin.png');
        addRefImage('arrow', '../img/arrow.png');
        addRefImage('walkDown', '../img/zelda_walk_down.png');
        addRefImage('walkUp', '../img/zelda_walk_up.png');
        addRefImage('attackDown', '../img/zelda_slash_down.png');
        addRefImage('attackUp', '../img/zelda_slash_up.png');
        addRefImage('tent', '../img/tent_icon.png');
        addRefImage('crystal', '../img/crystal.png');
    }
    Engine.initRefImages = initRefImages;
    function initCanvasElement(canvasElement) {
        return new Promise((resolve, reject) => {
            this.initEngine();
            this.canvas = canvasElement;
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = document.body.clientHeight - (document.body.clientHeight * 0.10);
            this.context = this.canvas.getContext('2d');
            this.canvas.addEventListener('touchstart', e => this.touchEvent(e));
            this.tick();
            resolve(true);
        });
    }
    Engine.initCanvasElement = initCanvasElement;
    function tick() {
        requestAnimationFrame(() => {
            this.clearFrame();
            this.updateFrame();
            this.tick();
        });
    }
    Engine.tick = tick;
    function touchEvent(e) {
        const touch = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
        const instance = this.checkPointCollision(touch.x, touch.y, e.touches[0].radiusX);
        if (instance) {
            instance.clicked();
        }
    }
    Engine.touchEvent = touchEvent;
    function clearFrame() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    Engine.clearFrame = clearFrame;
    function updateFrame() {
        const unitArray = Object.keys(this.unitStack).map(key => this.unitStack[key]).sort((a, b) => {
            if (a.location.y > b.location.y) {
                return 1;
            }
            else {
                return -1;
            }
        });
        unitArray.forEach(unit => {
            if (unit) {
                unit.tick();
                this.drawFrame(unit);
            }
        });
    }
    Engine.updateFrame = updateFrame;
    function drawFrame(unit) {
        if (unit.animEngine) {
            const buffer = unit.animEngine.bufferCanvas;
            if (unit.teamIndex !== 1) {
                unit.animEngine.bufferContext.filter = 'hue-rotate(180deg)';
            }
            this.context.drawImage(buffer, unit.location.x - unit.size / 2, unit.location.y - unit.size / 2);
        }
    }
    Engine.drawFrame = drawFrame;
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    Engine.generateUUID = generateUUID;
    function lookAtTarget(source, target) {
        const yDiff = target.y - source.y;
        const xDiff = target.x - source.x;
        let angle = Math.atan2(yDiff, xDiff);
        angle = angle * (180 / Math.PI);
        if (angle < 0) {
            angle = 360 - (-angle);
        }
        return angle;
    }
    Engine.lookAtTarget = lookAtTarget;
    function incrementTowards(degree) {
        const radians = degree * (Math.PI / 180);
        return {
            x: Math.cos(radians),
            y: Math.sin(radians)
        };
    }
    Engine.incrementTowards = incrementTowards;
    function checkCollision(self, radius) {
        for (let key in this.unitStack) {
            const unit = this.unitStack[key];
            const xCalc = Math.pow(unit.location.x - self.location.x, 2);
            const yCalc = Math.pow(unit.location.y - self.location.y, 2);
            if (xCalc + yCalc < Math.pow(radius * 2, 2) && unit.teamIndex !== self.teamIndex) {
                return unit;
            }
        }
        return undefined;
    }
    Engine.checkCollision = checkCollision;
    function checkPointCollision(x, y, radius) {
        for (let key in this.unitStack) {
            const unit = this.unitStack[key];
            const xCalc = Math.pow(unit.location.x - x, 2);
            const yCalc = Math.pow(unit.location.y - y, 2);
            if (xCalc + yCalc < Math.pow(radius * 2, 2)) {
                return unit;
            }
        }
        return undefined;
    }
    Engine.checkPointCollision = checkPointCollision;
})(Engine || (Engine = {}));
//# sourceMappingURL=engine.js.map