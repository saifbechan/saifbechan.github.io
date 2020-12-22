import p5Types, { Vector } from 'p5';

import { MissionStatistics } from '../Types/Statistics.type';

export default class Statistics {
  private pos: Vector;

  constructor(p5: p5Types) {
    this.pos = p5.createVector(20, p5.height - 20);
  }

  render(p5: p5Types, statistics: MissionStatistics): void {
    const texts: string[] = [
      `Framerate: ${Math.floor(p5.frameRate())}`,
      `Generation: ${statistics.generation}`,
      `Fitness: ${statistics.fitness}`,
      `Reached: ${statistics.reached}`,
    ];

    p5.textFont('Inconsolata, monospace');
    p5.textAlign(p5.LEFT);
    p5.textSize(14);
    p5.fill(191, 191, 191);
    texts.forEach((text: string, index: number) => {
      p5.text(text, this.pos.x, this.pos.y - index * 16);
    });
  }
}
