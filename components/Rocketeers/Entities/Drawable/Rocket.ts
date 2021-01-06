import P5, { Graphics, Image, Vector } from 'p5';

import { Ships } from '../../Helpers/Config';
import Explosion from './Explosion';
import Obstacle from './Obstacles/Obstacle';

export default class Rocket {
  private readonly p5: P5;
  private readonly images: Map<string, Image | Graphics>;
  private explosion: Explosion;

  private travelled = 0;

  private readonly pos: Vector;
  private readonly vel: Vector;
  private readonly acc: Vector;

  constructor(p5: P5, images: Map<string, Image | Graphics>) {
    this.p5 = p5;
    this.images = images;
    this.explosion = new Explosion(p5, images);

    this.pos = p5.createVector(p5.width / 2, p5.height - 10);
    this.vel = p5.createVector();
    this.acc = p5.createVector();
  }

  distanceTo(pos: Vector, diameter: number): number {
    return this.p5.dist(this.pos.x, this.pos.y, pos.x, pos.y) - diameter;
  }

  hasCrashedInto(obstacle: Obstacle): boolean {
    return obstacle.checkCollision(this.pos);
  }

  isOffScreen(): boolean {
    return (
      this.pos.y > this.p5.height || this.pos.x < 0 || this.pos.y < 0 || this.pos.x > this.p5.width
    );
  }

  getTravelled(): number {
    return this.travelled;
  }

  getPosition(): Vector {
    return this.pos;
  }

  update(step: Vector): void {
    const oldpos = this.pos.copy();

    this.acc.add(step);
    this.vel.add(this.acc);

    this.pos.add(this.vel);

    this.acc.mult(0);
    this.vel.limit(3);

    this.travelled += this.p5.dist(this.pos.x, this.pos.y, oldpos.x, oldpos.y);
  }

  draw(champion: boolean): void {
    this.p5.push();

    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.vel.heading());

    this.drawThruster();
    this.drawRocket(champion);

    this.p5.pop();
  }

  private drawThruster(): void {
    this.p5.noStroke();
    this.p5.fill(255, 185, 0);
    this.p5.ellipse(this.p5.random([-6, -8]), 0, 16, 4);
    this.p5.fill(255, 255, 0);
    this.p5.ellipse(this.p5.random([-6, -8]), 0, 12, 6);
  }

  private drawRocket(champion: boolean): void {
    this.p5.imageMode(this.p5.CENTER);
    const image = this.p5.createImage(1, 1);
    switch (champion) {
      case true:
        this.p5.image(this.images.get(Ships.CHAMPION) || image, 0, 0, 30, 30);
        break;
      default:
        this.p5.image(this.images.get(Ships.ROCKETEER) || image, 0, 0, 30, 30);
        break;
    }
  }

  crash(): void {
    this.explosion.draw(this.p5, this.pos);
  }
}
