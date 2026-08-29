export default {
  id: 1,

  name: "Level 1",

  player: {
    x: 100,
    y: 400
  },

  platforms: [
    { x: 100, y: 500, width: 300 },
    { x: 500, y: 500, width: 250 },
    { x: 820, y: 420, width: 200 },
    { x: 1100, y: 350, width: 250 },
    { x: 1450, y: 450, width: 300 },
    { x: 1900, y: 400, width: 350 }
  ],

  traps: [
    { x: 350, y: 470 },
    { x: 720, y: 470 },
    { x: 1000, y: 390 },
    { x: 1400, y: 420 },
    { x: 1800, y: 370 }
  ],

  finish: {
    x: 2150,
    y: 350
  }
};
