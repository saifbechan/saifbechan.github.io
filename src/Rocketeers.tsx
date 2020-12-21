import { FC } from 'react';
import Sketch from 'react-p5';

import p5Types, { Image } from 'p5';

import Mission from './Entities/Mission';
import { Obstacle } from './Entities/Obstacles/Obstacle.interface';
import Title from './Entities/Obstacles/Title';
import Target from './Entities/Target';
import Statistics from './Layout/Statistics';

interface MissionProps {
  lifespan: number;
  rocketeers: number;
}

const Rocketeers: FC<MissionProps> = ({
  lifespan,
  rocketeers,
}: MissionProps) => {
  let mission: Mission;
  let statistics: Statistics;

  const images: Map<string, Image> = new Map<string, Image>();
  const obstacles: Obstacle[] = [];
  const targets: Target[] = [];

  let step = 0;

  const preload = (p5: p5Types) => {
    images.set('ship', p5.loadImage('ship.png'));
    images.set('planet-orange', p5.loadImage('planet-orange.png'));
    images.set('ai-rocketeers', p5.loadImage('ai-rocketeers.png'));
    images.set('astronout', p5.loadImage('astronout.png'));
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    targets.push(
      new Target(
        p5,
        p5.createVector(p5.width / 2, 50),
        10,
        images.get('planet-orange')
      )
    );
    obstacles.push(new Title(p5, images.get('ai-rocketeers')));

    mission = new Mission(p5, lifespan, images.get('ship'));
    mission.init(rocketeers, obstacles, targets);

    statistics = new Statistics(p5);
  };

  const draw = (p5: p5Types) => {
    p5.background(8, 51, 73);

    targets.forEach((target: Target) => target.render());
    obstacles.forEach((obstacle: Obstacle) => obstacle.render());

    mission.run(step);

    step += 1;
    if (step === lifespan) {
      mission.evaluate();
      mission.init(rocketeers, obstacles, targets);
      step = 0;
    }

    statistics.render(p5, mission.getStatistics());
  };

  const windowResized = () => {
    window.location.reload();
  };

  return (
    <Sketch
      draw={draw}
      preload={preload}
      setup={setup}
      windowResized={windowResized}
    />
  );
};

export default Rocketeers;
