import p5Types, { Graphics, Image, Vector } from 'p5';

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
  private readonly trails: Graphics;

  constructor(p5: p5Types, images: Map<string, Image>, trails: Graphics) {
    this.createLayouts(p5);
    this.createTargets(p5, images);
    this.createObstacles(p5, images);

    this.trails = trails;
  }

  private createLayouts(p5: p5Types) {
    this.layouts.push(new Statistics(p5));
  }

  private createTargets(p5: p5Types, images: Map<string, Image | Graphics>) {
    this.targets.push(
      new Target(
        p5,
        p5.createVector((p5.width / 4) * 3, 150),
        40,
        images.get(Planets.RED)
      )
    );
    this.targets.push(
      new Target(
        p5,
        p5.createVector(p5.width / 2, 50),
        35,
        images.get(Planets.ORANGE)
      )
    );
    this.targets.push(
      new Target(
        p5,
        p5.createVector((p5.width / 5) * 3, 200),
        45,
        images.get(Planets.BIG_BLUE)
      )
    );
    this.targets.push(
      new Target(
        p5,
        p5.createVector((p5.width / 7) * 2, 220),
        30,
        images.get(Planets.LITTLE_BLUE)
      )
    );
    this.targets.push(
      new Target(
        p5,
        p5.createVector(p5.width / 7, 440),
        20,
        images.get(Planets.BROWN)
      )
    );
    this.targets.push(
      new Target(
        p5,
        p5.createVector((p5.width / 7) * 6, 550),
        15,
        images.get(Planets.LITTLE_PRUPLE)
      )
    );
    this.targets.push(
      new Target(
        p5,
        p5.createVector((p5.width / 7) * 2.5, 470),
        10,
        images.get(Planets.LITTLE_GREEN)
      )
    );
  }

  private createObstacles(p5: p5Types, images: Map<string, Image>) {
    this.obstacles.push(new Title(p5, images.get(Obstacles.AI_ROCKETEER)));
  }

  render(p5: p5Types, statistics: MissionStatistics, trails: Vector[]): void {
    trails.forEach((trail) => {
      this.trails.stroke(222, 99, 154, 30);
      this.trails.point(trail.x, trail.y);
    });
    p5.imageMode(p5.CORNER);
    p5.image(this.trails, 0, 0);
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
