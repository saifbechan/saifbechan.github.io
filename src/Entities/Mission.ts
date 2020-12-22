import p5Types, { Image } from 'p5';

import { MissionStatistics } from '../Types/Statistics.type';
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
    this.statistics = { generation: 0, fitness: 0, reached: 0 };
  }

  init(rocketeers: number, obstacles: Obstacle[], targets: Target[]): void {
    this.statistics = {
      ...this.statistics,
      generation: (this.statistics.generation += 1),
    };
    for (let count = 0; count < rocketeers; count += 1) {
      let rocketeer: Rocketeer;
      if (count === rocketeers - 1 && this.champion) {
        rocketeer = new Rocketeer(
          targets,
          obstacles,
          new Rocket(this.p5, this.ships),
          this.champion.getInstructions(),
          true
        );
        this.champion = undefined;
      } else {
        rocketeer = new Rocketeer(
          targets,
          obstacles,
          new Rocket(this.p5, this.ships),
          new Instructions(
            this.p5,
            this.lifespan,
            this.instructions,
            this.champion?.getInstructions()
          ),
          false
        );
      }

      this.rocketeers.set(count, rocketeer);
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
      if (rocketeer.getFitness() >= 0.9999999) {
        return;
      }
      for (let j = 0; j < weight; j += 1) {
        this.instructions.set(
          this.instructions.size,
          rocketeer.getInstructions()
        );
      }
    });

    this.statistics = {
      ...this.statistics,
      fitness: Math.floor(maxfit),
    };
  }

  run(step: number): void {
    let reached = 0;
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      rocketeer.update(step);
      reached += rocketeer.getReached();
    });
    this.statistics = {
      ...this.statistics,
      reached,
    };
  }

  getStatistics(): MissionStatistics {
    return this.statistics;
  }
}
