import p5Types, { Image } from 'p5';

import Rocket from './Rocket';
import Target from './Target';

interface MissionProps {
  p5: p5Types;
  lifespan: number;
  rocketeers: number;
  ship: Image;
}

class Mission {
  private readonly lifespan: number;
  private readonly target: Target;
  private readonly rockets: Rocket[];
  private readonly p5: p5Types;
  private readonly rocketeers: number;
  private readonly ship: Image;

  private previous: Rocket[];

  constructor({ p5, lifespan, rocketeers, ship }: MissionProps) {
    this.p5 = p5;
    this.lifespan = lifespan;
    this.rocketeers = rocketeers;
    this.ship = ship;
    this.target = new Target({ p5 });
    this.rockets = [];
    this.previous = [];
    for (let index = 0; index < rocketeers; index += 1) {
      this.rockets[index] = new Rocket({
        p5,
        lifespan,
        target: this.target,
        ship,
      });
    }
  }

  evaluate(): void {
    let maxfit = 0;
    let fastestRocket = Infinity;
    this.previous = [];
    this.rockets.forEach((rocket: Rocket) => {
      rocket.setFitness();
      maxfit = Math.max(maxfit, rocket.getFitness());
      fastestRocket = Math.min(fastestRocket, rocket.getEndTime());
    });
    this.rockets.forEach((rocket: Rocket) => {
      rocket.bonusFitness(fastestRocket);
    });
    this.rockets.forEach((rocket: Rocket) => {
      rocket.normalizeFitness(maxfit);
    });
    this.rockets.forEach((rocket: Rocket) => {
      const numberOfTimesInPool = rocket.getFitness() * 100;
      for (let j = 0; j < numberOfTimesInPool; j += 1) {
        this.previous.push(rocket);
      }
    });
  }

  selection(): void {
    for (let index = 0; index < this.rocketeers; index += 1) {
      this.rockets[index] = new Rocket({
        p5: this.p5,
        lifespan: this.lifespan,
        target: this.target,
        ship: this.ship,
        parents: [
          this.p5.random(this.previous).getRoute(),
          this.p5.random(this.previous).getRoute(),
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
