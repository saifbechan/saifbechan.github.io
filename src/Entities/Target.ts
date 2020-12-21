import p5Types, { Image, Vector } from 'p5';

interface TargetProps {
  p5: p5Types;
  pos: Vector;
  diameter: number;
  planet?: Image;
}

class Target {
  private readonly p5: p5Types;
  private readonly pos: Vector;
  private readonly diameter: number;
  private readonly planet: Image;

  constructor({ p5, pos, diameter, planet = new Image() }: TargetProps) {
    this.p5 = p5;
    this.pos = pos;
    this.planet = planet;
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
    this.p5.image(this.planet, this.pos.x, this.pos.y);
  }
}

export default Target;
