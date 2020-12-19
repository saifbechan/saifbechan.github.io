import p5Types from 'p5';

interface TargetProps {
  p5: p5Types;
}

class Target {
  private readonly p5: p5Types;

  private readonly posX: number;
  private readonly posY: number;

  constructor({ p5 }: TargetProps) {
    this.p5 = p5;
    this.posX = p5.width / 2;
    this.posY = 50;
  }

  show(): void {
    this.p5.fill(248, 229, 91);
    this.p5.noStroke();
    this.p5.ellipse(this.posX, this.posY, 16, 16);
  }

  get y(): number {
    return this.posY;
  }
  get x(): number {
    return this.posX;
  }
}

export default Target;
