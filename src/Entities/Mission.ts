import p5Types, { Image } from 'p5';

import Instructions from './Instructions';
import { Obstacle } from './Obstacles/Obstacle.interface';
import Rocket from './Rocket';
import Rocketeer from './Rocketeer';
import Target from './Target';

type MissionType = {
  targets: Target[];
  obstacles: Obstacle[];
};

type InitType = {
  p5: p5Types;
  lifespan: number;
  rocketeers: number;
  ship: Image;
};

export default class Mission {
  private readonly targets: Target[];
  private readonly obstacles: Obstacle[];

  private readonly rocketeers: Map<number, Rocketeer> = new Map<
    number,
    Rocketeer
  >();
  private readonly instructions: Map<number, Instructions> = new Map<
    number,
    Instructions
  >();

  constructor({ targets, obstacles }: MissionType) {
    this.obstacles = obstacles;
    this.targets = targets;
  }

  init({ p5, lifespan, rocketeers, ship }: InitType): void {
    for (let rocketeer = 0; rocketeer < rocketeers; rocketeer += 1) {
      this.rocketeers.set(
        rocketeer,
        new Rocketeer(
          this.targets,
          this.obstacles,
          new Rocket({
            p5,
            ship,
          }),
          new Instructions(p5, lifespan, this.instructions)
        )
      );
    }
    this.instructions.clear();
  }

  evaluate(p5: p5Types): void {
    let maxfit = 0;
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      maxfit = Math.max(maxfit, rocketeer.calcFitness(p5));
    });
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      rocketeer.normalizeFitness(maxfit);
    });
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      if (rocketeer.getFitness() < 0.5) return;

      const weight = rocketeer.getFitness() * 100;
      for (let j = 0; j < weight; j += 1) {
        this.instructions.set(
          this.instructions.size,
          rocketeer.getInstructions()
        );
      }
    });

    console.log(maxfit, this.instructions.size);
  }

  run(step: number): void {
    // TODO refactor to use renderable objects
    this.targets.forEach((target: Target) => target.render());
    this.obstacles.forEach((obstacle: Obstacle) => obstacle.render());

    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      rocketeer.update(step);
    });
  }
}
