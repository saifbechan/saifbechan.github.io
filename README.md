# Rocketeers :rocket::man_astronaut::woman_astronaut:
![Rocketeers CI](https://github.com/saifbechan/rocketeers/workflows/Rocketeers%20CI/badge.svg) [![Netlify Status](https://api.netlify.com/api/v1/badges/defdd7c4-ca37-452c-ab3e-34e2532de821/deploy-status)](https://app.netlify.com/sites/rocketeers/deploys)

## What do the rocketeers do?
The rocketeers use a genetic learning algorithm do explore a map of targets and obstables. The main purpose of the Rocketeer is to explore as much planets without getting hit.

## How does the genetic learning algorithm work?
First we start a mission with a set of rocketeers. All rocketeers have the same lifespan, the time they stay alive. Each Rocketeer gets assigned a set of random instructions and a spaceship. The Rocketeer has to do exactly what the instructions tell them. At the end of the run we evaluatie the mission and see which Rocketeers did the best. Based on this group of successfull Rocketeers we start a new group.

## What technologies are used?
 - This is a super simple learning algorithm build in Typescript/Javascript.
 - The animations and drawing are done with p5js.
 - The site itself uses React.

---

#### Inspiration & Credits
Inspiration for this idea came from an episode of The Coding Train [@CodingTrain](https://github.com/CodingTrain). Thanks [@shiffman](https://github.com/shiffman) for this great content.
