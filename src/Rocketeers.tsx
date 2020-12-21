import { FC } from 'react';
import Sketch from 'react-p5';

import p5Types, { Image } from 'p5';

import Mission from './Entities/Mission';
import { Obstacle } from './Entities/Obstacles/Obstacle.interface';
import Statistics from './Entities/Obstacles/Statistics';
import Title from './Entities/Obstacles/Title';
import Target from './Entities/Target';

interface MissionProps {
  lifespan: number;
  rocketeers: number;
}

const Rocketeers: FC<MissionProps> = ({
  lifespan,
  rocketeers,
}: MissionProps) => {
  let mission: Mission;
  let ship: Image;

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
      new Target({
        p5,
        planet: images.get('planet-orange'),
        pos: p5.createVector(p5.width / 2, 50),
        diameter: 10,
      })
    );

    obstacles.push(new Title({ p5, image: images.get('ai-rocketeers') }));
    obstacles.push(new Statistics({ p5 }));

    ship = images.get('ship') || p5.createImage(1, 1);
    mission = new Mission({
      targets,
      obstacles,
    });
    mission.init({
      p5,
      lifespan,
      rocketeers,
      ship,
    });
  };

  const draw = (p5: p5Types) => {
    p5.background(8, 51, 73);
    mission.run(step);

    step += 1;
    if (step === lifespan) {
      mission.evaluate(p5);
      mission.init({ p5, lifespan, rocketeers, ship });
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
