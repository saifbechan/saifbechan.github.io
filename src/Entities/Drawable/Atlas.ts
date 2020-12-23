import p5Types, { Image } from 'p5';

import { Obstacles, Planets } from '../../Helpers/Config';
import { MissionStatistics } from '../../Types/Statistics.type';
import Layout from './Layout/Layout';
import Statistics from './Layout/Statistics';
import Obstacle from './Obstacles/Obstacle';
import Title from './Obstacles/Title';
import Target from './Target';

export default class Atlas {
  private readonly layouts: Layout[] = [];
  private readonly targets: Target[] = [];
  private readonly obstacles: Obstacle[] = [];

  constructor(p5: p5Types, images: Map<string, Image>) {
    this.createLayouts(p5);
    this.createTargets(p5, images);
    this.createObstacles(p5, images);
  }

  private createLayouts(p5: p5Types) {
    this.layouts.push(new Statistics(p5));
  }

  private createTargets(p5: p5Types, images: Map<string, Image>) {
    this.targets.push(
      new Target(
        p5,
        p5.createVector(p5.width / 2, 50),
        25,
        images.get(Planets.ORANGE)
      )
    );

    this.targets.push(
      new Target(
        p5,
        p5.createVector((p5.width / 4) * 3, 150),
        40,
        images.get(Planets.RED)
      )
    );
  }

  private createObstacles(p5: p5Types, images: Map<string, Image>) {
    this.obstacles.push(new Title(p5, images.get(Obstacles.AI_ROCKETEER)));
  }

  render(p5: p5Types, statistics: MissionStatistics): void {
    this.layouts.forEach((layout: Layout) => layout.draw(p5, statistics));
    this.targets.forEach((targets: Target) => targets.draw());
    this.obstacles.forEach((obstacle: Obstacle) => obstacle.draw());
  }
  getTargets(): Target[] {
    return this.targets;
  }
  getObstacles(): Obstacle[] {
    return this.obstacles;
  }
}
