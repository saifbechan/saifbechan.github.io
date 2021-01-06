import { Vector } from 'p5';

export default abstract class Obstacle {
  abstract checkCollision(position: Vector): boolean;
  abstract draw(): void;
}
