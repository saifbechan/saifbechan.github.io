import P5, { Graphics, Image, Vector } from 'p5';

import { MissionStatistics } from '../Types/Statistics.type';
import Atlas from './Drawable/Atlas';
import Rocket from './Drawable/Rocket';
import Instructions from './Instructions';
import Rocketeer from './Rocketeer';

export default class Mission {
  private readonly p5: P5;
  private readonly images: Map<string, Image>;

  private readonly atlas: Atlas;
  private readonly rocketeers: Rocketeer[] = [];
  private instructions: Instructions[] = [];
  private champion: Rocketeer | undefined;
  private statistics: MissionStatistics;
  private trails: Vector[] = [];

  constructor(p5: P5, images: Map<string, Image>, trails: Graphics) {
    this.p5 = p5;
    this.images = images;

    this.atlas = new Atlas(p5, images, trails);
    this.statistics = {
      instructions: 0,
      generation: 0,
      fitness: 0,
      reached: 0,
      maxtravel: 0,
      champion: '',
      lifespan: 0,
    };
  }

  init(generation: number, lifespan: number, rocketeers: number): void {
    this.statistics = {
      ...this.statistics,
      generation,
      lifespan,
    };
    for (let count = 0; count < rocketeers; count += 1) {
      let rocketeer: Rocketeer;
      if (count === rocketeers - 1 && this.champion) {
        rocketeer = new Rocketeer(
          this.atlas,
          new Rocket(this.p5, this.images),
          this.champion.getInstructions(),
          this.champion.countAndReturn()
        );
      } else {
        rocketeer = new Rocketeer(
          this.atlas,
          new Rocket(this.p5, this.images),
          new Instructions(this.p5, lifespan, this.instructions),
          0
        );
      }
      this.rocketeers[count] = rocketeer;
    }
    this.instructions = [];
  }

  evaluate(lifespan: number): void {
    let maxfit = 0;
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      const fitness = rocketeer.calcFitness(this.p5, lifespan);
      if (fitness > maxfit) {
        maxfit = fitness;
        this.champion =
          rocketeer.countAndReturn() > 5 ? this.champion : rocketeer;
      }
    });
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      rocketeer.normalizeFitness(maxfit);
    });
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      const weight = rocketeer.getFitness() * 100;
      for (let j = 0; j < weight; j += 1) {
        this.instructions.push(rocketeer.getInstructions());
      }
    });

    this.statistics = {
      ...this.statistics,
      instructions: this.instructions.length,
      fitness: Math.floor(maxfit),
      champion: this.champion?.toString() || '',
    };

    // eslint-disable-next-line no-console
    console.log(this.statistics);
  }

  run(step: number): void {
    this.atlas.render(this.p5, this.statistics, this.trails);

    let reached = 0;
    let maxtravel = 0;
    this.trails = [];
    this.rocketeers.forEach((rocketeer: Rocketeer) => {
      rocketeer.update(step);
      this.trails.push(rocketeer.getRocketPosition());
      reached += rocketeer.getVisits();
      maxtravel = Math.floor(
        Math.max(maxtravel, rocketeer.getRocketTravelled())
      );
    });
    this.statistics = {
      ...this.statistics,
      reached,
      maxtravel,
    };
  }
}
