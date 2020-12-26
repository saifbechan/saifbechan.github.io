import p5Types, { Vector } from 'p5';

import Atlas from './Drawable/Atlas';
import Obstacle from './Drawable/Obstacles/Obstacle';
import Rocket from './Drawable/Rocket';
import Target from './Drawable/Target';
import Instructions from './Instructions';

type JourneyType = { distance: number; closest: number; reached: number };
export default class Rocketeer {
  private readonly atlas: Atlas;
  private readonly rocket: Rocket;
  private readonly instructions: Instructions;

  private readonly champion: boolean;
  private readonly logbook: Map<number, JourneyType> = new Map<
    number,
    JourneyType
  >();
  private visit = Infinity;
  private visits = 0;
  private crashed = 0;
  private fitness = 0;
  private bonus = 0;
  private penalty = 0;

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
    this.fitness = 0;
    this.atlas.getTargets().forEach((target: Target, index: number) => {
      const journey: JourneyType = this.logbook.get(index) || {
        distance: 0,
        closest: Infinity,
        reached: 0,
      };
      if (journey.closest === Infinity) return;

      if (journey.reached > 0) {
        this.fitness += p5.width * this.visits;
        this.fitness += p5.map(journey.reached, 0, lifespan, lifespan, 0) * 10;
        this.fitness *= Math.min(1, this.visits);
      } else if (journey.closest === journey.distance) {
        this.fitness += Math.max(
          0,
          p5.map(journey.closest, 0, p5.width, p5.width, 0)
        );
      }
    });
    if (this.bonus > 0) {
      this.fitness *= this.bonus;
    }
    if (this.penalty > 0) {
      this.fitness /= this.penalty;
    }
    if (this.crashed > 0) this.fitness /= 100;

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

    this.atlas.getObstacles().forEach((obstacle: Obstacle) => {
      if (this.rocket.hasCrashedInto(obstacle)) {
        this.crashed = step;
      }
    });

    if (this.crashed > 0 || this.rocket.isOffScreen()) {
      this.crashed = step;
      return;
    }

    this.atlas.getTargets().forEach((target: Target, index: number) => {
      if (this.visits === this.atlas.getTargets().length) {
        this.bonus += 1;
        return;
      }
      const journey: JourneyType = this.logbook.get(index) || {
        distance: 0,
        closest: Infinity,
        reached: 0,
      };
      if (journey.reached > 0) return;

      const distance = this.rocket.distanceTo(
        target.getPosition(),
        target.getDiameter()
      );
      const closest = Math.min(distance, journey.closest);
      if (journey.closest < 200 && distance > 400) {
        this.penalty = 10;
      }
      if (distance <= Math.random() * 20 - 5) {
        this.visit = step;
        this.visits += 1;
        journey.reached = step;
      }
      this.logbook.set(index, {
        ...journey,
        distance,
        closest,
      });
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
    return this.visits;
  }

  getRocketPosition(): Vector {
    return this.rocket.getPosition();
  }

  getRocketTravelled(): number {
    return this.rocket.getTravelled();
  }

  toString(): string {
    return `Travelled: ${this.getRocketTravelled()}`;
  }
}
