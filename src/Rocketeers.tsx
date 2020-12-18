import React from "react";
import Sketch from "react-p5";

import p5Types from "p5";

interface ComponentProps {
  rockets: number
}

const Rocketeers: React.FC<ComponentProps> = (props: ComponentProps) => {
  let x = 50;
  const y = 50;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(props.rockets, props.rockets).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x += 1;
  };

  return <Sketch draw={draw} setup={setup} />;
};

export default Rocketeers;
