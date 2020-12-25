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
  private fitness = 0;
  private readonly champion: boolean;
  private visit = Infinity;
  private visits: number[] = [];

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

  normalizeFitness(maxfit: number): void {
    this.fitness /= maxfit;
  }

  calcFitness(p5: p5Types, lifespan: number): number {
    if (this.visits.length > 0) {
      this.visits.forEach((step: number, index: number) => {
        this.fitness = p5.width;
        this.fitness += p5.map(step, 0, lifespan, lifespan, 0) * 10;

        if (index < this.atlas.getTargets().length) {
          return;
        }

        if (this.visits.length === this.atlas.getTargets().length) {
          this.fitness += this.rocket.getTravelled();
        } else {
          this.fitness +=
            Math.max(0, p5.map(this.closest, 0, p5.width, p5.width, 0)) * 10;
        }
      });
    } else {
      this.fitness = Math.max(
        0,
        p5.map(this.closest, 0, p5.width, p5.width, 0)
      );
    }
    if (this.crashed > 0) this.fitness /= 10;
    if (this.rocket.getDamaged() > 0) {
      this.fitness /= this.rocket.getDamaged() * 10;
    }

    return this.fitness;
  }

  update(step: number): void {
    if (this.crashed > 0) {
      return;
    }

    if (this.visit < Infinity && this.visit + 25 > step) {
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
      if (distance <= Math.random() * 20 - 5) {
        this.closest = Infinity;
        this.visit = step;
        this.visits.push(step);
      }
      this.logbook.set(index, { distance, reached: this.closest === Infinity });
    });

    this.rocket.draw(this.champion);
  }

  getFitness(): number {
    return this.fitness;
  }

  getInstructions(): Instructions {
    return this.instructions;
  }

  getVisits(): number {
    return this.visits.length;
  }

  getRocketPosition(): Vector {
    return this.rocket.getPosition();
  }

  getRocketTravelled(): number {
    return this.rocket.getTravelled();
  }
}
