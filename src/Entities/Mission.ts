import p5Types, { Image } from 'p5';

import { MissionStatistics } from '../MissionStatistics.type';
import Instructions from './Instructions';
import { Obstacle } from './Obstacles/Obstacle.interface';
import Rocket from './Rocket';
import Rocketeer from './Rocketeer';
import Target from './Target';

export default class Mission {
  private readonly p5: p5Types;
  private readonly lifespan: number;
  private readonly ship: Image;

  private readonly rocketeers: Map<number, Rocketeer> = new Map<
    number,
    Rocketeer
  >();
  private readonly instructions: Map<number, Instructions> = new Map<
    number,
    Instructions
  >();
  private champion: Instructions | undefined;

  private statistics: MissionStatistics;

  constructor(
    p5: p5Types,
    lifespan: number,
    ship: Image = p5.createImage(1, 1)
  ) {
    this.p5 = p5;
    this.lifespan = lifespan;
    this.ship = ship;
    this.statistics = { generation: 0 };
  }

  init(rocketeers: number, obstacles: Obstacle[], targets: Target[]): void {
    this.statistics = {
      ...this.statistics,
      generation: (this.statistics.generation += 1),
    };
    for (let rocketeer = 0; rocketeer < rocketeers; rocketeer += 1) {
      this.rocketeers.set(
        rocketeer,
        new Rocketeer(
          targets,
          obstacles,
          new Rocket({
            p5: this.p5,
            ship: this.ship,
          }),
          new Instructions(
            this.p5,
            this.lifespan,
            this.instructions,
            this.champion
          )
        )
      );
    }
    this.instructions.clear();
  }

  evaluate(): void {
    let maxfit = 0;
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      const fitness = rocketeer.calcFitness(this.p5, this.lifespan);
      if (fitness > maxfit) {
        maxfit = fitness;
        this.champion = rocketeer.getInstructions();
      }
    });
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      rocketeer.normalizeFitness(maxfit);
    });
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      const weight = rocketeer.getFitness() * 100;
      for (let j = 0; j < weight; j += 1) {
        this.instructions.set(
          this.instructions.size,
          rocketeer.getInstructions()
        );
      }
    });
  }

  run(step: number): void {
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      rocketeer.update(step);
    });
  }

  getStatistics(): MissionStatistics {
    return this.statistics;
  }
}
