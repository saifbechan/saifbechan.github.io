import p5Types, { Vector } from 'p5';

import { Obstacle, ObstacleProps } from '../../Interfaces/Obstacle';
import Rocket from '../Rocket';

export default class Title implements Obstacle {
  private readonly p5: p5Types;
  private readonly pos: Vector;

  private height = 32;
  private width = 0;

  constructor({ p5 }: ObstacleProps) {
    this.p5 = p5;
    this.pos = p5.createVector(p5.width / 2, 300);
  }

  gotHit(rocket: Rocket): boolean {
    const rocketPosition = rocket.getPosition();

    if (
      rocketPosition.x > this.pos.x - this.width / 2 &&
      rocketPosition.x < this.pos.x + this.width / 2 &&
      rocketPosition.y > this.pos.y - this.height / 2 &&
      rocketPosition.y < this.pos.y + this.height / 2
    ) {
      return true;
    }

    return this.width === Infinity;
  }

  render(): void {
    const title = 'saifbechan.com';

    this.p5.textAlign(this.p5.CENTER);
    this.p5.textSize(this.height);
    this.p5.fill(0, 102, 153);
    this.p5.text(title, this.pos.x, this.pos.y);

    this.width = Math.floor(this.p5.textWidth(title));
  }
}
