const {
  WORLD_STATE_KEY,
} = require("../../levels/twilio_birthday_2021/events/config");

function applyHoverTween(game, sprite) {
  const hoverAdjustment = 2;

  const tween = game.add.tween(sprite).to(
    {
      y: sprite.y + hoverAdjustment,
    },
    400, // time
    Phaser.Easing.Exponential.In,
    undefined,
    undefined,
    -1, // repeat infinitely
    true // yoyo)
  );

  tween.start();
}

module.exports = {
  animations: {},
  spriteSheets: {
    tq_bday_2021_cupcake: {
      fileName: "Cupcake.png",
      frameDimensions: {
        width: 13,
        height: 18,
      },
    },
    tq_bday_2021_splat: {
      fileName: "SplatAnim.png",
      frameDimensions: {
        width: 24,
        height: 24,
      },
    },
  },
  events: {
    onMapDidLoad: (self) => {
      applyHoverTween(self.game, self.sprite);
    },
    onPlayerDidInteract: (self, event, world) => {
      if (event.target !== self) {
        return;
      }

      self.destroy();
      world.showNotification(
        `This cupcake technology seems powerful! CLICK anywhere on the screen to unleash it!`
      );

      const worldState = world.getState(WORLD_STATE_KEY);

      worldState.hasUnlockedCupcake = true;

      world.setState(WORLD_STATE_KEY, worldState);
    },
  },
  properties: {
    sprite: {
      defaultFrameIndex: 0,
      spriteSheet: "tq_bday_2021_cupcake",
      layers: [],
    },
  },
};
