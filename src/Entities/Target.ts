import p5Types, { Image } from 'p5';

interface TargetProps {
  p5: p5Types;
  planet?: Image;
}

class Target {
  private readonly p5: p5Types;

  private readonly posX: number;
  private readonly posY: number;
  private readonly planet: Image;

  constructor({ p5, planet = new Image() }: TargetProps) {
    this.p5 = p5;
    this.posX = p5.width / 2;
    this.posY = 50;
    this.planet = planet;
  }

  show(): void {
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.planet, this.posX, this.posY);
  }

  get y(): number {
    return this.posY;
  }
  get x(): number {
    return this.posX;
  }
}

export default Target;
