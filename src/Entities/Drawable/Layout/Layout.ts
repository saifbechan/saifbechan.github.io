import P5 from 'p5';

import { MissionStatistics } from '../../../Types/Statistics.type';

export default interface Layout {
  draw(p5: P5, statistics: MissionStatistics): void;
}
