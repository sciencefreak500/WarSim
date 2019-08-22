import { Soldier } from './soldier.js';
import { gifFrames } from 'gif-frames'
export class Engine {
    constructor() {
        console.log('engine service started');
        this.unitStack = {};
        this.spawnable = {
            soldier: {
              enabled: true,
              interval: 1000,
              instance: Soldier
            }
          };
    }

    initCanvasElement(canvasElement) {
        return new Promise((resolve, reject) => {
            this.canvas = canvasElement;
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = document.body.clientHeight - (document.body.clientHeight * 0.10);
            this.context = this.canvas.getContext('2d');
            this.initAnimations();
            // this.tick();
            resolve();
        });
      }

    initAnimations() {
      new Promise((resolve, reject) => {
        const soldier = {
          idle: gifFrames({url: '../img/poke.gif', frames: 'all', outputType: 'canvas'}).then(frameData => {
            frameData.forEach((frame) => {
              console.log(frame);
            });
          })
        }
      });
    }

    tick() {
        requestAnimationFrame(() => {
            this.clearFrame();
            this.updateFrame();
            this.tick();
        });
    }
    
    clearFrame() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    updateFrame() {
      const keys = Object.keys(this.unitStack);
      for(var i in keys){
        const unit = this.unitStack[keys[i]];
        if (unit) {
          unit.tick();
          this.drawFrame(unit);
        }
      }
    }
    
    drawFrame(unit) {
      if (unit.testGif) {
        const buffer = gifler.Animator.createBufferCanvas(
          unit.testGif._frames[unit.testGif._frameIndex],
          unit.testGif.width,
          unit.testGif.height
        );
        this.context.drawImage(buffer, unit.location.x, unit.location.y, 32, 32);
      }

      // this.context.beginPath();
      // this.context.arc(unit.location.x, unit.location.y, 5, 0, 360);
      // if (unit.teamIndex === 1) {
      //   this.context.fillStyle = '#3370d4'; // blue
      // } else {
      //   this.context.fillStyle = '#c82124'; // red
      // }
      // this.context.closePath();
      // this.context.fill();
      // this.context.stroke();
    }

    generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
}
