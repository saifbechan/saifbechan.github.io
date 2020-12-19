import p5Types, { Image } from 'p5';

import Rocket from './Rocket';
import Target from './Target';

interface MissionProps {
  p5: p5Types;
  lifespan: number;
  rocketeers: number;
  ships: Image[];
}

class Mission {
  private readonly lifespan: number;
  private readonly target: Target;
  private readonly rockets: Rocket[];
  private readonly pool: Rocket[];
  private readonly p5: p5Types;
  private readonly rocketeers: number;
  private readonly ships: Image[];

  constructor({ p5, lifespan, rocketeers, ships }: MissionProps) {
    this.p5 = p5;
    this.lifespan = lifespan;
    this.rocketeers = rocketeers;
    this.ships = ships;
    this.target = new Target({ p5 });
    this.rockets = [];
    this.pool = [];
    for (let index = 0; index < rocketeers; index += 1) {
      this.rockets[index] = new Rocket({
        p5,
        lifespan,
        target: this.target,
        ships,
      });
    }
  }

  evaluate(): void {
    let maxfit = 0;
    this.rockets.forEach((rocket) => {
      rocket.setFitness();
      maxfit = Math.max(maxfit, rocket.getFitness());
    });
    this.rockets.forEach((rocket) => {
      rocket.normalizeFitness(maxfit);
    });
    this.rockets.forEach((rocket) => {
      const numberOfTimesInPool = rocket.getFitness() * 100;
      for (let j = 0; j < numberOfTimesInPool; j += 1) {
        this.pool.push(rocket);
      }
    });
  }

  selection(): void {
    for (let index = 0; index < this.rocketeers; index += 1) {
      this.rockets[index] = new Rocket({
        p5: this.p5,
        lifespan: this.lifespan,
        target: this.target,
        ships: this.ships,
        parents: [
          this.p5.random(this.pool).getRoute(),
          this.p5.random(this.pool).getRoute(),
        ],
      });
    }
  }

  run(step: number): void {
    this.target.show();
    this.rockets.forEach((rocket) => {
      rocket.update(step);
      rocket.show();
    });
  }
}

export default Mission;
