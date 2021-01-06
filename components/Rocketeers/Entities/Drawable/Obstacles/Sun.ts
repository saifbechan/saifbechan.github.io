import P5, { Image, Vector } from 'p5';

import Obstacle from './Obstacle';

export default class Sun extends Obstacle {
  private readonly p5: P5;
  private readonly pos: Vector;

  private readonly image: Image;
  private readonly diameter: number;

  constructor(p5: P5, image: Image) {
    super();
    this.p5 = p5;
    this.image = image;
    this.pos = p5.createVector(60, 60);
    this.diameter = 170;
  }

  checkCollision(position: Vector): boolean {
    return (
      this.p5.dist(this.pos.x, this.pos.y, position.x, position.y) <
      this.diameter - 40 - Math.random() * 50
    );
  }

  draw(): void {
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.image, this.pos.x, this.pos.y, this.diameter * 2, this.diameter * 2);
  }
}
