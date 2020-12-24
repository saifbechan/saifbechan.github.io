import p5Types, { Graphics, Image, Vector } from 'p5';

import { MissionStatistics } from '../Types/Statistics.type';
import Atlas from './Drawable/Atlas';
import Rocket from './Drawable/Rocket';
import Instructions from './Instructions';
import Rocketeer from './Rocketeer';

export default class Mission {
  private readonly p5: p5Types;
  private readonly lifespan: number;
  private readonly images: Map<string, Image>;

  private readonly atlas: Atlas;
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
  private trails: Vector[] = [];

  constructor(
    p5: p5Types,
    lifespan: number,
    images: Map<string, Image>,
    trails: Graphics
  ) {
    this.p5 = p5;
    this.lifespan = lifespan;
    this.images = images;

    this.atlas = new Atlas(p5, images, trails);
    this.statistics = {
      instructions: 0,
      generation: 0,
      fitness: 0,
      reached: 0,
    };
  }

  init(rocketeers: number): void {
    this.statistics = {
      ...this.statistics,
      generation: (this.statistics.generation += 1),
    };
    for (let count = 0; count < rocketeers; count += 1) {
      let rocketeer: Rocketeer;
      if (count === rocketeers - 1 && this.champion) {
        rocketeer = new Rocketeer(
          this.atlas,
          new Rocket(this.p5, this.images),
          this.champion.getInstructions(),
          true
        );
        this.champion = undefined;
      } else {
        rocketeer = new Rocketeer(
          this.atlas,
          new Rocket(this.p5, this.images),
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
      for (let j = 0; j < weight; j += 1) {
        this.instructions.set(
          this.instructions.size,
          rocketeer.getInstructions()
        );
      }
    });

    this.statistics = {
      ...this.statistics,
      instructions: this.instructions.size,
      fitness: Math.floor(maxfit),
    };
  }

  run(step: number): void {
    this.atlas.render(this.p5, this.statistics, this.trails);

    let reached = 0;
    this.trails = [];
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      rocketeer.update(step);

      this.trails.push(rocketeer.getRocketPosition());
      reached += rocketeer.getReached();
    });
    this.statistics = {
      ...this.statistics,
      reached,
    };
  }
}
