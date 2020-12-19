import p5Types, { Vector } from 'p5';

import Route from './Route';
import Target from './Target';

interface RocketProps {
  p5: p5Types;
  index: number;
  target: Target;
}

class Rocket {
  private readonly p5: p5Types;
  private readonly index: number;
  private readonly target: Target;
  private readonly route: Route;

  private pos: Vector;
  private readonly vel: Vector;
  private readonly acc: Vector;

  private completed = false;
  private crashed = false;

  constructor({ p5, index, target }: RocketProps) {
    this.p5 = p5;
    this.index = index;
    this.target = target;
    this.route = new Route(p5);
    this.pos = p5.createVector(p5.width / 2, p5.height);
    this.vel = p5.createVector();
    this.acc = p5.createVector();
  }

  update(): void {
    const { route } = this;
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
    this.p5.noStroke();
    this.p5.fill(255, 150);
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.vel.heading());
    this.p5.rectMode(this.p5.CENTER);
    this.p5.rect(0, 0, 25, 5);
    this.p5.pop();
  }
}

export default Rocket;
