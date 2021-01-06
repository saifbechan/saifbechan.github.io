import P5, { Graphics, Image, Vector } from 'p5';

export default class Target {
  private readonly p5: P5;
  private readonly pos: Vector;
  private readonly diameter: number;
  private readonly image: Image | Graphics | undefined;

  constructor(p5: P5, pos: Vector, diameter: number, image: Image | Graphics | undefined) {
    this.p5 = p5;
    this.pos = pos;
    this.image = image;
    this.diameter = diameter;
  }

  getPosition(): Vector {
    return this.pos;
  }

  getDiameter(): number {
    return this.diameter;
  }

  draw(): void {
    if (!this.image) {
      return;
    }

    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.image, this.pos.x, this.pos.y, this.diameter * 2, this.diameter * 2);
  }
}
