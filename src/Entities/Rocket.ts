import p5Types, { Image, Vector } from 'p5';

import Route from './Route';
import Target from './Target';

interface RocketProps {
  p5: p5Types;
  index: number;
  target: Target;
  ships: Image;
}

class Rocket {
  private readonly p5: p5Types;
  private readonly index: number;
  private readonly target: Target;
  private readonly route: Route;
  private readonly ships: Image;

  private pos: Vector;
  private readonly vel: Vector;
  private readonly acc: Vector;

  private completed = false;
  private crashed = false;
  private fitness = 0;

  constructor({ p5, index, target, ships }: RocketProps) {
    this.p5 = p5;
    this.index = index;
    this.target = target;
    this.route = new Route(p5);
    this.ships = ships;
    this.pos = p5.createVector(p5.width / 2, p5.height);
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

  private calcFitness(): void {
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

  update(): void {
    const { route, target } = this;

    if (this.hasCompleted()) {
      this.completed = true;
      this.pos = this.p5.createVector(target.x, target.y);
    }

    if (this.hasCrashed()) {
      this.crashed = true;
    }

    this.acc.add(route.getStep(this.index));
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }

  show(): void {
    this.p5.push();
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.vel.heading());
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.ships, 0, 0);
    this.p5.pop();
  }
}

export default Rocket;
