import p5Types, { Vector } from 'p5';

import { Evolution } from '../Helpers/Config';

class Instructions {
  private readonly steps: Vector[] = [];

  constructor(
    p5: p5Types,
    lifespan: number,
    instructions: Instructions[],
    generation: number
  ) {
    for (let i = 0; i < lifespan; i += 1) {
      const step =
        instructions.length > 0 && this.shouldMutate(generation)
          ? this.getStepWithRetry(p5, instructions, i)
          : Vector.random2D();
      this.steps[i] = p5.createVector(step.x, step.y);
      this.steps[i].setMag(Evolution.MAX_FORCE);
    }
  }

  private shouldMutate = (generation: number): boolean =>
    Evolution.MUTATION_RATE / Math.max(1, generation / 10) < Math.random();

  private getStepWithRetry(
    p5: p5Types,
    instructions: Instructions[],
    index: number
  ): Vector {
    return (
      p5.random(instructions).getStep(index) ||
      this.getStepWithRetry(p5, instructions, index)
    );
  }

  getStep(index: number): Vector {
    return this.steps[index];
  }
}

export default Instructions;
