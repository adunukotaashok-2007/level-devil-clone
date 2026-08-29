export default {
  id: 3,

  name: "Level 3",

  player: {
    x: 100,
    y: 400
  },

  platforms: [
    { x: 100, y: 500, width: 220 },
    { x: 450, y: 400, width: 150 },
    { x: 750, y: 500, width: 150 },
    { x: 1050, y: 350, width: 150 },
    { x: 1350, y: 450, width: 150 },
    { x: 1650, y: 300, width: 150 },
    { x: 2000, y: 500, width: 300 }
  ],

  traps: [
    { x: 250, y: 470 },
    { x: 500, y: 370 },
    { x: 800, y: 470 },
    { x: 1100, y: 320 },
    { x: 1400, y: 420 },
    { x: 1700, y: 270 },
    { x: 1900, y: 470 }
  ],

  finish: {
    x: 2200,
    y: 440
  }
};
