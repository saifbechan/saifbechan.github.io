import P5, { Vector } from 'p5';

import { Evolution } from '../Helpers/Config';

class Instructions {
  private readonly steps: Vector[];

  constructor(p5: P5, lifespan: number, instructions: Instructions[]) {
    const steps = this.crossover(
      p5,
      lifespan,
      instructions[Math.floor(Math.random() * instructions.length)],
      instructions[Math.floor(Math.random() * instructions.length)]
    );

    this.steps = this.mutate(p5, steps);
  }

  private crossover = (
    p5: P5,
    lifespan: number,
    current: Instructions,
    partner: Instructions
  ): Vector[] => {
    const steps: Vector[] = new Array(lifespan);
    const middle = current ? Math.floor(Math.random() * current.getLength()) : -1;

    for (let index = 0; index < lifespan; index += 1) {
      if (middle === -1 || !current.getStep(index) || !partner.getStep(index)) {
        steps[index] = this.createRandom(p5);
      } else if (index > middle) {
        steps[index] = this.createFromPrevious(p5, current.getStep(index));
      } else {
        steps[index] = this.createFromPrevious(p5, partner.getStep(index));
      }
    }
    return steps;
  };

  private mutate = (p5: P5, steps: Vector[]): Vector[] =>
    steps.map((step) => {
      if (this.shouldMutate()) {
        return this.createRandom(p5);
      }
      return step;
    });

  private shouldMutate = (): boolean => Math.random() < Evolution.MUTATION_RATE;

  private createRandom = (p5: P5): Vector => {
    const step = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
    return p5.createVector(step.x, step.y).setMag(Evolution.MAX_FORCE);
  };

  private createFromPrevious = (p5: P5, step: Vector): Vector => p5.createVector(step.x, step.y);

  getLength(): number {
    return this.steps.length;
  }

  getStep(index: number): Vector {
    return this.steps[index];
  }
}

export default Instructions;
