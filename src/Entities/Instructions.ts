import p5Types, { Vector } from 'p5';

import { Evolution } from '../Helpers/Config';

class Instructions {
  private readonly steps: Vector[] = [];

  constructor(
    p5: p5Types,
    lifespan: number,
    instructions: Map<number, Instructions>,
    champion: Instructions | undefined,
    generation: number
  ) {
    const maxforce = 0.1;

    const templates: (
      | Instructions
      | undefined
    )[] = Instructions.extractTemplates(instructions, champion);

    for (let i = 0; i < lifespan; i += 1) {
      const template = templates[Math.round(Math.random())];
      const step =
        template &&
        Evolution.MUTATION_RATE / Math.max(1, generation / 10) < Math.random()
          ? template.getStep(i)
          : Vector.random2D();
      this.steps[i] = p5.createVector(step.x, step.y);
      this.steps[i].setMag(maxforce);
    }
  }

  getStep(index: number): Vector {
    return this.steps[index];
  }

  private static extractTemplates(
    instructions: Map<number, Instructions>,
    champion: Instructions | undefined
  ): (Instructions | undefined)[] {
    return [
      Evolution.CHAMPTION_RATE > Math.random()
        ? champion
        : instructions.get(Math.floor(Math.random() * instructions.size)),
      instructions.get(Math.floor(Math.random() * instructions.size)),
    ];
  }
}

export default Instructions;
