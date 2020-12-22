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
  private readonly ships: Map<string, Image>;

  private readonly rocketeers: Map<number, Rocketeer> = new Map<
    number,
    Rocketeer
  >();
  private readonly instructions: Map<number, Instructions> = new Map<
    number,
    Instructions
  >();
  private champion: Rocketeer | undefined;

  private statistics: MissionStatistics;

  constructor(p5: p5Types, lifespan: number, ships: Map<string, Image>) {
    this.p5 = p5;
    this.lifespan = lifespan;
    this.ships = ships;
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
          new Rocket(this.p5, this.ships),
          rocketeer === rocketeers - 1 && this.champion
            ? this.champion.getInstructions()
            : new Instructions(
                this.p5,
                this.lifespan,
                this.instructions,
                this.champion?.getInstructions()
              ),
          rocketeer === rocketeers - 1 && typeof this.champion !== 'undefined'
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
        this.champion = rocketeer;
      }
    });
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      rocketeer.normalizeFitness(maxfit);
    });
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      const weight = rocketeer.getFitness() * 100;
      if (rocketeer.getFitness() <= 0.8) {
        return;
      }
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
