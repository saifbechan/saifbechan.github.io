import p5Types, { Vector } from 'p5';

interface RouteProps {
  p5: p5Types;
  lifespan: number;
  parents?: Vector[];
}

class Route {
  private readonly p5: p5Types;
  private readonly lifespan: number;
  private readonly steps: Vector[];

  private readonly maxforce: number = 0.1;
  private readonly mutationRate: number = 0.01;

  constructor({ p5, lifespan, parents }: RouteProps) {
    this.p5 = p5;
    this.lifespan = lifespan;
    this.steps = [];
    for (let i = 0; i < this.lifespan; i += 1) {
      const step =
        parents && p5.random(1) > this.mutationRate
          ? this.p5.random(parents).getStep(i)
          : Vector.random2D();
      this.steps[i] = this.p5.createVector(step.x, step.y);
      this.steps[i].setMag(this.maxforce);
    }
  }

  getStep(index: number): Vector {
    return this.steps[index];
  }
}

export default Route;
