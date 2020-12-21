import p5Types from 'p5';

import Instructions from './Instructions';
import { Obstacle } from './Obstacles/Obstacle.interface';
import Rocket from './Rocket';
import Target from './Target';

export default class Rocketeer {
  private readonly targets: Target[];
  private readonly obstacles: Obstacle[];
  private readonly rocket: Rocket;
  private readonly instructions: Instructions;

  private readonly journey: Map<
    number,
    { distance: number; reached: boolean }
  > = new Map<number, { distance: number; reached: boolean }>();
  private closest = Infinity;
  private crashed = false;
  private reached = 0;
  private fitness = 0;

  constructor(
    targets: Target[],
    obstacles: Obstacle[],
    rocket: Rocket,
    instructions: Instructions
  ) {
    this.targets = targets;
    this.obstacles = obstacles;
    this.rocket = rocket;
    this.instructions = instructions;
  }

  getFitness(): number {
    return this.fitness;
  }

  calcFitness(p5: p5Types): number {
    this.fitness = p5.map(this.closest, 0, p5.width, p5.width, 0);

    if (this.reached > 0) this.fitness *= 10 * this.reached;

    if (this.crashed) this.fitness /= 10;

    return this.fitness;
  }

  normalizeFitness(maxfit: number): void {
    this.fitness /= maxfit;
  }

  getInstructions(): Instructions {
    return this.instructions;
  }

  update(step: number): void {
    if (this.crashed) return;

    this.rocket.update(this.instructions.getStep(step));

    this.crashed = this.rocket.isOffScreen();

    this.obstacles.forEach((obstacle: Obstacle) => {
      if (this.rocket.hasCrashedInto(obstacle)) {
        this.crashed = true;
      }
    });

    this.targets.forEach((target: Target, index: number) => {
      const journey = this.journey.get(index);
      if (journey && journey.reached) return;

      const distance = this.rocket.distanceTo(target);
      this.closest = Math.min(this.closest, distance);
      if (distance <= 0) {
        this.closest = Infinity;
        this.reached += 1;
      }
      this.journey.set(index, { distance, reached: distance <= 0 });
    });

    this.rocket.render();
  }
}
