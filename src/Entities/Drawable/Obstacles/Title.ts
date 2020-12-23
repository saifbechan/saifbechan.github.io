import p5Types, { Image, Vector } from 'p5';

import { getViewport, Viewport } from '../../../Helpers/Viewport';
import Obstacle from './Obstacle';

export default class Title extends Obstacle {
  private readonly p5: p5Types;
  private readonly pos: Vector;

  private readonly image: Image;
  private readonly scale;
  private readonly height;
  private width = 0;

  constructor(p5: p5Types, image: Image = p5.createImage(1, 1)) {
    super();
    this.p5 = p5;
    this.image = image;
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

  checkCollision(position: Vector): boolean {
    return (
      position.x > this.pos.x - this.width / 2 &&
      position.x < this.pos.x + this.width / 2 &&
      position.y > this.pos.y - this.scale &&
      position.y < this.pos.y + 10
    );
  }

  draw(): void {
    this.drawTitle();
    this.drawSubtitle();
    this.drawIcon();
  }

  private drawIcon() {
    this.p5.imageMode(this.p5.CENTER);
    this.p5.image(
      this.image,
      this.pos.x - this.width / 1.9,
      this.pos.y - this.scale,
      this.scale,
      this.scale
    );
  }

  private drawTitle() {
    const text = 'rocketeers';
    this.p5.stroke(255, 20, 147, 80);
    this.p5.strokeWeight(2);
    this.p5.textFont('Bungee Outline');
    this.p5.textAlign(this.p5.CENTER);
    this.p5.textSize(this.height);
    this.p5.fill(255);
    this.p5.text(text, this.pos.x, this.pos.y);
    this.p5.noStroke();
    this.width = Math.floor(this.p5.textWidth(text));
  }

  private drawSubtitle(): void {
    this.p5.strokeWeight(1);
    this.p5.textFont('Jura');
    this.p5.textAlign(this.p5.CENTER);
    switch (getViewport(this.p5.width)) {
      case Viewport.XS:
        this.p5.textSize(10);
        this.p5.fill(255);
        this.p5.text(
          'artificial genenric algotihm by Saif Bechan',
          this.pos.x,
          this.pos.y + 20
        );
        break;
      case Viewport.SM:
      case Viewport.MD:
        this.p5.textSize(14);
        this.p5.fill(255);
        this.p5.text(
          'artificial genenric algotihm by Saif Bechan',
          this.pos.x,
          this.pos.y + 25
        );
        break;
      default:
        this.p5.textSize(16);
        this.p5.fill(255);
        this.p5.text(
          'artificial genenric algotihm by Saif Bechan',
          this.pos.x,
          this.pos.y + 30
        );
    }
  }
}
