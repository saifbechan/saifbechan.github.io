import p5Types, { Image, Vector } from 'p5';

class Target {
  private readonly p5: p5Types;
  private readonly pos: Vector;
  private readonly diameter: number;
  private readonly image: Image;

  constructor(
    p5: p5Types,
    pos: Vector,
    diameter: number,
    image: Image = p5.createImage(1, 1)
  ) {
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

  render(): void {
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.image, this.pos.x, this.pos.y);
  }
}

export default Target;
