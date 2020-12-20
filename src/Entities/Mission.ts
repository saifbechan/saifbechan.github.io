import p5Types, { Image } from 'p5';

import { Obstacle } from '../Interfaces/Obstacle';
import Rocket from './Rocket';
import Target from './Target';

interface MissionProps {
  p5: p5Types;
  lifespan: number;
  rocketeers: number;
  images: Map<string, Image>;
  obstacles: Obstacle[];
}

class Mission {
  private readonly p5: p5Types;
  private readonly lifespan: number;
  private readonly rocketeers: number;
  private readonly images: Map<string, Image>;

  private readonly target: Target;
  private readonly obstacles: Obstacle[];

  private readonly rockets: Rocket[] = [];
  private previous: Rocket[] = [];

  constructor({ p5, lifespan, rocketeers, images, obstacles }: MissionProps) {
    this.p5 = p5;
    this.lifespan = lifespan;
    this.rocketeers = rocketeers;
    this.images = images;
    this.obstacles = obstacles;

    this.target = new Target({ p5, planet: images.get('planet-orange') });

    this.previous = [];
    for (let index = 0; index < rocketeers; index += 1) {
      this.rockets[index] = new Rocket({
        p5,
        lifespan,
        target: this.target,
        ship: images.get('ship'),
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
      if (rocket.getFitness() < 0.5) return;

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
        ship: this.images.get('ship'),
        parents: [
          this.p5.random(this.previous).getRoute(),
          this.p5.random(this.previous).getRoute(),
        ],
      });
    }
  }

  run(step: number): void {
    this.target.show();

    this.obstacles.forEach((obstacle: Obstacle) => obstacle.render());

    this.rockets.forEach((rocket: Rocket) => {
      rocket.update(step);
      this.obstacles.forEach((obstacle: Obstacle) => {
        if (obstacle.gotHit && obstacle.gotHit(rocket)) {
          rocket.setCrashed();
        }
      });
      rocket.show();
    });
  }
}

export default Mission;
