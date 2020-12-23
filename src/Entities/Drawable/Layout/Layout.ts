import p5Types from 'p5';

import { MissionStatistics } from '../../../Types/Statistics.type';

export default interface Layout {
  draw(p5: p5Types, statistics: MissionStatistics): void;
}
