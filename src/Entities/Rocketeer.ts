import p5Types, { Vector } from 'p5';

import Atlas from './Drawable/Atlas';
import Obstacle from './Drawable/Obstacles/Obstacle';
import Rocket from './Drawable/Rocket';
import Target from './Drawable/Target';
import Instructions from './Instructions';

type JourneyType = {
  distance: number;
  closest: number;
  reached: number;
};
export default class Rocketeer {
  private readonly atlas: Atlas;
  private readonly rocket: Rocket;
  private readonly instructions: Instructions;

  private champion = 0;
  private readonly journey: JourneyType = {
    distance: 0,
    closest: Infinity,
    reached: 0,
  };
  private readonly logbook: Map<number, JourneyType> = new Map<
    number,
    JourneyType
  >();
  private closest: number | undefined = undefined;
  private visit = Infinity;
  private visits = 0;
  private crashed = 0;
  private fitness = 0;
  private penalty = 0;

  constructor(
    atlas: Atlas,
    rocket: Rocket,
    instructions: Instructions,
    champion: number
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
        ...this.journey,
      };
      if (journey.closest === Infinity) return;

      if (journey.reached > 0) {
        this.fitness += p5.width;
        this.fitness += p5.map(journey.reached, 0, lifespan, lifespan, 0);
      }
    });

    const closest = this.logbook.get(this.closest || -1) || {
      ...this.journey,
    };

    if (this.visits === this.atlas.getTargets().length) {
      this.fitness **= 2;
    } else if (closest.distance > 0) {
      this.fitness += p5.map(closest.distance, 0, lifespan, lifespan, 0);
    }

    this.fitness *= this.visits > 1 ? this.visits + 1 : 1;

    if (this.penalty > 0) {
      this.fitness /= this.penalty;
    }
    if (this.crashed > 0) this.fitness /= 10;

    return this.fitness;
  }

  update(step: number): void {
    if (this.crashed > 0) {
      return;
    }

    if (this.visit < Infinity && this.visit + 25 > step) {
      this.rocket.draw(this.champion > 0);
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
      if (this.closest === undefined) {
        this.closest = index;
      }
      const journey: JourneyType = this.logbook.get(index) || {
        ...this.journey,
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
      if (index === this.closest && distance <= Math.random() * 20 - 5) {
        journey.reached = step;
        this.closest = undefined;
        this.visit = step;
        this.visits += 1;
      }
      this.logbook.set(index, {
        ...journey,
        distance,
        closest,
      });
    });

    this.rocket.draw(this.champion > 1);
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

  countAndReturn(): number {
    this.champion += 1;
    return this.champion;
  }
}
