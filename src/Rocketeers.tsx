import { FC } from 'react';
import Sketch from 'react-p5';

import p5Types, { Image } from 'p5';

import Mission from './Entities/Mission';
import Statistics from './Entities/Obstacles/Statistics';
import Title from './Entities/Obstacles/Title';
import { Obstacle } from './Interfaces/Obstacle';

interface MissionProps {
  lifespan: number;
  rocketeers: number;
}

const Rocketeers: FC<MissionProps> = ({
  lifespan,
  rocketeers,
}: MissionProps) => {
  let mission: Mission;
  const images: Map<string, Image> = new Map<string, Image>();
  const obstacles: Obstacle[] = [];

  let step = 0;

  const preload = (p5: p5Types) => {
    images.set('ship', p5.loadImage('ship.png'));
    images.set('planet-orange', p5.loadImage('planet-orange.png'));
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    obstacles.push(new Title({ p5 }));
    obstacles.push(new Statistics({ p5 }));
    mission = new Mission({ p5, lifespan, rocketeers, images, obstacles });
  };

  const draw = (p5: p5Types) => {
    p5.background(8, 51, 73);
    mission.run(step);

    step += 1;
    if (step === lifespan) {
      mission.evaluate();
      mission.selection();
      step = 0;
    }
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
