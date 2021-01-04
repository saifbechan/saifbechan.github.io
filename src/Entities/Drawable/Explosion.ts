import P5, { Graphics, Image, Vector } from 'p5';

import { Explosion as ExplosionConfig } from '../../Helpers/Config';

export default class Explosion {
  private index = 0.0;
  private readonly sprites: Image[] = [];

  constructor(p5: P5, images: Map<string, Image | Graphics>) {
    const image = p5.createImage(1, 1);
    const sprite = images.get(ExplosionConfig.SPRITE) || image;

    sprite.loadPixels();
    this.sprites.push(sprite.get(1, 1, 89, 89));
    this.sprites.push(sprite.get(93, 1, 89, 89));
    this.sprites.push(sprite.get(185, 1, 89, 89));
    this.sprites.push(sprite.get(277, 1, 89, 89));
    this.sprites.push(sprite.get(369, 1, 89, 89));

    this.sprites.push(sprite.get(1, 93, 89, 89));
    this.sprites.push(sprite.get(93, 93, 89, 89));
    this.sprites.push(sprite.get(185, 93, 89, 89));
    this.sprites.push(sprite.get(277, 93, 89, 89));
    this.sprites.push(sprite.get(369, 93, 89, 89));
  }

  draw(p5: P5, pos: Vector): void {
    if (this.index > this.sprites.length) return;

    p5.image(
      this.sprites[Math.floor(this.index) % this.sprites.length],
      pos.x,
      pos.y,
      30,
      30
    );

    this.index += ExplosionConfig.SPEED;
  }
}
