import React, { FC } from 'react';
import Sketch from 'react-p5';

import P5, { Image } from 'p5';

import Contact from './components/contact';
import Mission from './Entities/Mission';
import { Explosion, Obstacles, Planets, Ships } from './Helpers/Config';

import './app.scss';

interface MissionProps {
  lifespan: number;
  rocketeers: number;
}

const App: FC<MissionProps> = ({ lifespan, rocketeers }: MissionProps) => {
  let step = 0;
  let steps = lifespan;
  let generation = 1;

  let mission: Mission;

  const images: Map<string, Image> = new Map<string, Image>();

  const preload = (p5: P5) => {
    Object.values(Ships).forEach((ship: string) => {
      images.set(ship, p5.loadImage(`images/${ship}.png`));
    });

    Object.values(Planets).forEach((planet: string) => {
      images.set(planet, p5.loadImage(`images/${planet}.png`));
    });

    Object.values(Obstacles).forEach((layout: string) => {
      images.set(layout, p5.loadImage(`images/${layout}.png`));
    });

    images.set(
      Explosion.SPRITE,
      p5.loadImage(`images/${Explosion.SPRITE}.png`)
    );
  };

  const setup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth - 4, p5.windowHeight - 4).parent(
      canvasParentRef
    );

    mission = new Mission(
      p5,
      images,
      p5.createGraphics(p5.windowWidth - 4, p5.windowHeight - 4)
    );
    mission.init(generation, steps, rocketeers);
  };

  const draw = (p5: P5) => {
    p5.background(20, 21, 38);
    mission.run(step);
    step += 1;
    if (step === steps) {
      mission.evaluate(steps);

      step = 0;
      generation += 1;
      if (generation >= 100) {
        steps = lifespan + 1000;
      } else if (generation >= 50) {
        steps = lifespan + 800;
      } else if (generation >= 30) {
        steps = lifespan + 400;
      } else if (generation >= 10) {
        steps = lifespan + 200;
      }

      mission.init(generation, steps, rocketeers);
    }
  };

  const windowResized = () => {
    window.location.reload();
  };

  return (
    <div data-testid="app" id="app">
      <Sketch
        draw={draw}
        preload={preload}
        setup={setup}
        windowResized={windowResized}
      />
      <footer>
        <Contact />
      </footer>
    </div>
  );
};

export default App;
