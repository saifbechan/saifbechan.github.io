import React from 'react';
import Sketch from 'react-p5';

import p5Types, { Image } from 'p5';

import Mission from './Entities/Mission';

interface MissionProps {
  rocketeers: number;
}

const Rocketeers: React.FC<MissionProps> = ({ rocketeers }: MissionProps) => {
  let mission: Mission;
  let ships: Image;

  const preload = (p5: p5Types) => {
    ships = p5.loadImage('ship.png');
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    mission = new Mission({ rocketeers, p5, ships });
  };

  const draw = (p5: p5Types) => {
    p5.background(42, 61, 113);
    mission.start();
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
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
