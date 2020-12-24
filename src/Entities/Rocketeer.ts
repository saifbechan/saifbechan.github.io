import p5Types, { Vector } from 'p5';

import Atlas from './Drawable/Atlas';
import Obstacle from './Drawable/Obstacles/Obstacle';
import Rocket from './Drawable/Rocket';
import Target from './Drawable/Target';
import Instructions from './Instructions';

export default class Rocketeer {
  private readonly atlas: Atlas;
  private readonly rocket: Rocket;
  private readonly instructions: Instructions;

  private readonly logbook: Map<
    number,
    { distance: number; reached: boolean }
  > = new Map<number, { distance: number; reached: boolean }>();
  private closest = Infinity;
  private crashed = 0;
  private reached = 0;
  private fitness = 0;
  private readonly champion: boolean;
  private firstvisit = Infinity;

  constructor(
    atlas: Atlas,
    rocket: Rocket,
    instructions: Instructions,
    champion: boolean
  ) {
    this.atlas = atlas;
    this.rocket = rocket;
    this.instructions = instructions;
    this.champion = champion;
  }

  getFitness(): number {
    return this.fitness;
  }

  calcFitness(p5: p5Types, lifespan: number): number {
    this.fitness = this.rocket.getTravelled();

    if (this.reached > 0) {
      this.fitness += this.rocket.getTravelled();
      this.fitness += p5.map(this.firstvisit, 0, lifespan, lifespan, 0) * 2;
      this.fitness *= this.reached + 2;
    } else {
      this.fitness +=
        Math.max(0, p5.map(this.closest, 0, p5.width, p5.width, 0)) * 2;
    }
    if (this.crashed > 0) this.fitness /= 10;
    if (this.rocket.getDamaged() > 0) {
      this.fitness /= this.rocket.getDamaged() * 10;
    }

    return this.fitness;
  }

  normalizeFitness(maxfit: number): void {
    this.fitness /= maxfit;
  }

  getInstructions(): Instructions {
    return this.instructions;
  }

  getReached(): number {
    return this.reached;
  }

  getRocketPosition(): Vector {
    return this.rocket.getPosition();
  }

  update(step: number): void {
    if (this.crashed > 0) {
      return;
    }

    if (this.firstvisit < Infinity && this.firstvisit + 25 > step) {
      this.rocket.draw(this.champion);
      return;
    }

    this.rocket.update(this.instructions.getStep(step));

    if (this.rocket.isOffScreen() || this.rocket.getDamaged() === 10) {
      this.crashed = step;
      return;
    }

    this.atlas.getObstacles().forEach((obstacle: Obstacle) => {
      if (this.rocket.hasCrashedInto(obstacle)) {
        this.crashed = step;
      }
    });

    this.atlas.getTargets().forEach((target: Target, index: number) => {
      const journey = this.logbook.get(index);
      if (journey && journey.reached) return;

      const distance = this.rocket.distanceTo(
        target.getPosition(),
        target.getDiameter()
      );
      this.closest = Math.min(this.closest, distance);
      if (distance <= 0) {
        this.closest = Infinity;
        this.reached += 1;
        this.firstvisit = Math.min(this.firstvisit, step);
      }
      this.logbook.set(index, { distance, reached: distance <= 0 });
    });

    this.rocket.draw(this.champion);
  }
}
