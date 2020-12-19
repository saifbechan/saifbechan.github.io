import p5Types, { Vector } from 'p5';

class Route {
  private readonly length: number = 400;
  private readonly maxforce: number = 0.2;

  private readonly steps: Vector[];

  constructor(p5: p5Types) {
    this.steps = [];

    const rndm = Vector.random2D();
    for (let i = 0; i < this.length; i += 1) {
      this.steps[i] = p5.createVector(rndm.x, rndm.y);
      this.steps[i].setMag(this.maxforce);
    }
  }

  getStep(index: number): Vector {
    return this.steps[index];
  }
}

export default Route;
