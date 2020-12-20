import p5Types from 'p5';

import Rocket from '../Entities/Rocket';

export interface Obstacle {
  gotHit?(rocket: Rocket): boolean;
  render(): void;
}

export interface ObstacleProps {
  p5: p5Types;
}
