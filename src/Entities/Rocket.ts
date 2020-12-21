import p5Types, { Image, Vector } from 'p5';

import { Obstacle } from './Obstacles/Obstacle.interface';
import Target from './Target';

type RocketType = {
  p5: p5Types;
  ship: Image;
};

export default class Rocket {
  private readonly p5: p5Types;
  private readonly ship: Image;

  private readonly pos: Vector;
  private readonly vel: Vector;
  private readonly acc: Vector;

  constructor({ p5, ship }: RocketType) {
    this.p5 = p5;
    this.ship = ship;

    this.pos = p5.createVector(p5.width / 2, p5.height - 10);
    this.vel = p5.createVector();
    this.acc = p5.createVector();
  }

  distanceTo(target: Target): number {
    return (
      this.p5.dist(
        this.pos.x,
        this.pos.y,
        target.getPosition().x,
        target.getPosition().y
      ) - target.getDiameter()
    );
  }

  hasCrashedInto(obstacle: Obstacle): boolean {
    return obstacle.gothit ? obstacle.gothit(this.pos) : false;
  }

  isOffScreen(): boolean {
    return (
      this.pos.x > this.p5.width ||
      this.pos.x < 0 ||
      this.pos.y > this.p5.height ||
      this.pos.y < 0
    );
  }

  update(step: Vector): void {
    this.acc.add(step);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(4);
  }

  render(): void {
    this.p5.push();

    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.vel.heading());

    this.showThruster();
    this.showRocket();

    this.p5.pop();
  }

  private showThruster(): void {
    this.p5.noStroke();
    this.p5.fill(255, 185, 0);
    this.p5.ellipse(this.p5.random([-6, -8]), 0, 16, 4);
    this.p5.fill(255, 255, 0);
    this.p5.ellipse(this.p5.random([-6, -8]), 0, 12, 6);
  }

  private showRocket(): void {
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(this.ship, 0, 0);
  }
}
