import p5Types from 'p5';

import Rocket from './Rocket';
import Target from './Target';

interface MissionProps {
  rocketeers: number;
  p5: p5Types;
}

class Mission {
  private readonly target: Target;
  private readonly rockets: Rocket[];

  constructor({ rocketeers, p5 }: MissionProps) {
    this.target = new Target({ p5 });
    this.rockets = [];
    for (let index = 0; index < rocketeers; index += 1) {
      this.rockets[index] = new Rocket({ p5, index, target: this.target });
    }
  }

  start(): void {
    this.target.show();
    this.rockets.forEach((rocket) => {
      rocket.update();
      rocket.show();
    });
  }
}

export default Mission;
