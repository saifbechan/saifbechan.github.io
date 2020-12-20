import p5Types, { Image, Vector } from 'p5';

import { getViewport, Viewport } from '../../Helpers/viewport';
import { Obstacle, ObstacleProps } from '../../Interfaces/Obstacle';
import Rocket from '../Rocket';

export default class Title implements Obstacle {
  private readonly p5: p5Types;
  private readonly pos: Vector;

  private readonly image: Image;
  private readonly scale;
  private readonly height;
  private width = 0;

  constructor({ p5, image }: ObstacleProps) {
    this.p5 = p5;
    this.image = image || p5.createImage(1, 1);
    this.pos = p5.createVector(p5.width / 2, 400);

    switch (getViewport(p5.width)) {
      case Viewport.XS:
        this.height = 32;
        break;
      case Viewport.SM:
        this.height = 48;
        break;
      case Viewport.MD:
        this.height = 64;
        break;
      default:
        this.height = 78;
    }

    this.scale = (this.height / 5) * 4;
  }

  gotHit(rocket: Rocket): boolean {
    const rocketPosition = rocket.getPosition();
    return (
      rocketPosition.x > this.pos.x - this.width / 2 &&
      rocketPosition.x < this.pos.x + this.width / 2 &&
      rocketPosition.y > this.pos.y - this.scale &&
      rocketPosition.y < this.pos.y + 10
    );
  }

  render(): void {
    const title = 'rocketeers';

    this.p5.stroke(255, 20, 147, 80);
    this.p5.strokeWeight(2);
    this.p5.textFont('Bungee Outline');
    this.p5.textAlign(this.p5.CENTER);
    this.p5.textSize(this.height);
    this.p5.fill(255);
    this.p5.text(title, this.pos.x, this.pos.y);
    this.p5.noStroke();

    this.width = Math.floor(this.p5.textWidth(title));

    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(
      this.image,
      this.pos.x - this.width / 1.9,
      this.pos.y - this.scale,
      this.scale,
      this.scale
    );
  }
}