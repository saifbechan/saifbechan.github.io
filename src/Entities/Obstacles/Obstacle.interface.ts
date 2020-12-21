import p5Types, { Image, Vector } from 'p5';

export interface Obstacle {
  gothit?(position: Vector): boolean;
  render(): void;
}

export interface ObstacleProps {
  p5: p5Types;
  image?: Image;
}
