import React, { FC } from 'react';
import Sketch from 'react-p5';

import p5Types, { Image } from 'p5';

import Contact from './components/contact';
import Mission from './Entities/Mission';
import { Explosion, Obstacles, Planets, Ships } from './Helpers/Config';

import './app.scss';

interface MissionProps {
  lifespan: number;
  rocketeers: number;
}

const App: FC<MissionProps> = ({ lifespan, rocketeers }: MissionProps) => {
  let mission: Mission;

  const images: Map<string, Image> = new Map<string, Image>();

  let step = 0;

  const preload = (p5: p5Types) => {
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

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth - 4, p5.windowHeight - 4).parent(
      canvasParentRef
    );

    mission = new Mission(
      p5,
      lifespan,
      images,
      p5.createGraphics(p5.windowWidth - 4, p5.windowHeight - 4)
    );
    mission.init(rocketeers);
  };

  const draw = (p5: p5Types) => {
    p5.background(20, 21, 38);
    mission.run(step);
    step += 1;
    if (step === lifespan) {
      mission.evaluate();
      mission.init(rocketeers);
      step = 0;
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
