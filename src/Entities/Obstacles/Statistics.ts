import p5Types, { Vector } from 'p5';

import { Obstacle, ObstacleProps } from '../../Interfaces/Obstacle';

export default class Statistics implements Obstacle {
  private p5: p5Types;
  private pos: Vector;

  constructor({ p5 }: ObstacleProps) {
    this.p5 = p5;
    this.pos = p5.createVector(20, p5.height - 20);
  }

  render(): void {
    this.p5.textFont('Inconsolata, monospace');
    this.p5.textAlign(this.p5.LEFT);
    this.p5.textSize(14);
    this.p5.fill(255);
    this.p5.text(
      `Framerate: ${Math.floor(this.p5.frameRate())}`,
      this.pos.x,
      this.pos.y
    );
  }
}
