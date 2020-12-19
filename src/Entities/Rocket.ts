import p5Types, { Image, Vector } from 'p5';

import Route from './Route';
import Target from './Target';

interface RocketProps {
  p5: p5Types;
  lifespan: number;
  target: Target;
  ships: Image[];
  parents?: Vector[];
}

class Rocket {
  private readonly p5: p5Types;
  private readonly lifespan: number;
  private readonly target: Target;
  private readonly ship: Image;

  private readonly route: Route;

  private pos: Vector;
  private readonly vel: Vector;
  private readonly acc: Vector;

  private completed = false;
  private crashed = false;
  private fitness = 0;

  constructor({ p5, lifespan, target, ships, parents }: RocketProps) {
    this.p5 = p5;
    this.lifespan = lifespan;
    this.target = target;
    this.route = new Route({ p5, lifespan, parents });
    [this.ship] = ships;
    this.pos = p5.createVector(p5.width / 2, p5.height - 10);
    this.vel = p5.createVector();
    this.acc = p5.createVector();
  }

  private hasCompleted(): boolean {
    const { pos, target } = this;
    const distanceToTarget = this.p5.dist(pos.x, pos.y, target.x, target.y);
    return distanceToTarget < 10;
  }

  private hasCrashed(): boolean {
    return (
      this.pos.x > this.p5.width ||
      this.pos.x < 0 ||
      this.pos.y > this.p5.height ||
      this.pos.y < 0
    );
  }

  setFitness(): void {
    const { pos, target } = this;
    const distanceToTarget = this.p5.dist(pos.x, pos.y, target.x, target.y);
    this.fitness = this.p5.map(
      distanceToTarget,
      0,
      this.p5.width,
      this.p5.width,
      0
    );
    if (this.completed) {
      this.fitness *= 10;
    }
    if (this.crashed) {
      this.fitness /= 10;
    }
  }

  getFitness(): number {
    return this.fitness;
  }

  normalizeFitness(maxfit: number): void {
    this.fitness /= maxfit;
  }

  getRoute(): Route {
    return this.route;
  }

  update(step: number): void {
    const { route, target } = this;
    if (this.hasCompleted()) {
      this.completed = true;
      this.pos = this.p5.createVector(target.x, target.y);
    }
    if (this.hasCrashed()) {
      this.crashed = true;
    }
    this.acc.add(route.getStep(step));
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  show(): void {
    if (this.completed || this.crashed) return;
    this.p5.push();
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.vel.heading());
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.ship, 0, 0);
    this.p5.pop();
  }
}

export default Rocket;
