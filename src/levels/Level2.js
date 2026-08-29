export default {
  id: 2,

  name: "Level 2",

  player: {
    x: 100,
    y: 400
  },

  platforms: [
    { x: 100, y: 500, width: 250 },
    { x: 500, y: 450, width: 180 },
    { x: 800, y: 350, width: 160 },
    { x: 1100, y: 450, width: 180 },
    { x: 1450, y: 350, width: 180 },
    { x: 1800, y: 500, width: 250 }
  ],

  traps: [
    { x: 300, y: 470 },
    { x: 580, y: 420 },
    { x: 850, y: 320 },
    { x: 1200, y: 420 },
    { x: 1530, y: 320 },
    { x: 1900, y: 470 }
  ],

  finish: {
    x: 1950,
    y: 440
  }
};
