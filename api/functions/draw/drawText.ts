import { BitmapText, TextStyleAlign } from "pixi.js";
import { getBitmapText } from "../getBitmapText";
import { state } from "../../state";

export const drawText = (
  text: string,
  color: string,
  x: number,
  y: number,
  size: number,
  maxWidth: number,
  maxLines: number,
  horizontalAlignment: TextStyleAlign,
  zIndex: number,
): void => {
  if (state.values.app === null) {
    throw new Error(
      "An attempt was made to draw a rectangle before app was created.",
    );
  }
  const sprite: BitmapText = getBitmapText(
    text,
    color,
    size,
    maxWidth,
    maxLines,
    horizontalAlignment,
  );
  const startX: number = x - size;
  sprite.x =
    horizontalAlignment === "right"
      ? startX - sprite.textWidth
      : horizontalAlignment === "center"
        ? startX - Math.floor(sprite.textWidth / 2)
        : startX;
  if (horizontalAlignment === "center" && sprite.textWidth % 2 === 0) {
    sprite.x++;
  }
  sprite.y = y - size * 3;
  sprite.zIndex = zIndex;
  state.values.app.stage.addChild(sprite);
  state.setValues({
    renderChildrenToDestroy: [...state.values.renderChildrenToDestroy, sprite],
  });
};
