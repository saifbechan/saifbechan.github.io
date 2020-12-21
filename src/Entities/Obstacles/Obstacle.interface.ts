import { Vector } from 'p5';

export interface Obstacle {
  gothit?(position: Vector): boolean;
  render(): void;
}
