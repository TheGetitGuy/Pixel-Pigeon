import { Definable } from "./Definable";
import { TextStyleAlign } from "pixi.js";
import { drawText } from "../functions/draw/drawText";
import { getDefinable } from "../functions/getDefinable";
import { getToken } from "../functions/getToken";
import { handleCaughtError } from "../functions/handleCaughtError";
import { state } from "../state";

export interface CreateLabelOptions {
  color: string | (() => string);
  /**
   * Coordinates that can be used to precisely define where the Label should be on the screen
   */
  coordinates: {
    /**
     * Callback that decides whether or not coordinates should be used
     */
    condition?: () => boolean;
    /**
     * The X value on the screen where the Label is displayed
     */
    x: number | (() => number);
    /**
     * The Y value on the screen where the Label is displayed
     */
    y: number | (() => number);
  };
  text: string | (() => string);
  horizontalAlignment: TextStyleAlign;
}
interface LabelCoordinates {
  readonly condition: (() => boolean) | null;
  readonly x: number | (() => number);
  readonly y: number | (() => number);
}

export class Label extends Definable {
  private readonly _color: string | (() => string);
  private readonly _coordinates: LabelCoordinates;
  private readonly _horizontalAlignment: TextStyleAlign;
  private readonly _text: string | (() => string);
  public constructor(options: CreateLabelOptions) {
    super(getToken());
    this._color = options.color;
    this._coordinates = {
      condition: options.coordinates.condition ?? null,
      x: options.coordinates.x,
      y: options.coordinates.y,
    };
    this._horizontalAlignment = options.horizontalAlignment;
    this._text = options.text;
  }

  public drawAtCoordinates(): void {
    if (state.values.config === null) {
      throw new Error(
        `Label "${this._id}" attempted to draw at coordinates before config was loaded.`,
      );
    }
    if (this.passesCoordinatesCondition()) {
      const text: string | null = this.getText();
      const color: string | null = this.getColor();
      const x: number | null = this.getCoordinatesX();
      const y: number | null = this.getCoordinatesY();
      if (text !== null && color !== null && x !== null && y !== null) {
        drawText(
          text,
          color,
          x,
          y,
          1,
          state.values.config.width,
          1,
          this._horizontalAlignment,
          100,
        );
      }
    }
  }

  private passesCoordinatesCondition(): boolean {
    if (this._coordinates.condition === null) {
      return true;
    }
    try {
      return this._coordinates.condition();
    } catch (error: unknown) {
      handleCaughtError(error, `Label "${this._id}" coordinates condition`);
    }
    return false;
  }

  private getColor(): string | null {
    if (typeof this._color === "string") {
      return this._color;
    }
    try {
      return this._color();
    } catch (error: unknown) {
      handleCaughtError(error, `Label "${this._id}" color`);
    }
    return null;
  }

  private getCoordinatesX(): number | null {
    if (typeof this._coordinates.x === "number") {
      return this._coordinates.x;
    }
    try {
      return this._coordinates.x();
    } catch (error: unknown) {
      handleCaughtError(error, `Label "${this._id}" coordinates x`);
    }
    return null;
  }

  private getCoordinatesY(): number | null {
    if (typeof this._coordinates.y === "number") {
      return this._coordinates.y;
    }
    try {
      return this._coordinates.y();
    } catch (error: unknown) {
      handleCaughtError(error, `Label "${this._id}" coordinates y`);
    }
    return null;
  }

  private getText(): string | null {
    if (typeof this._text === "string") {
      return this._text;
    }
    try {
      return this._text();
    } catch (error: unknown) {
      handleCaughtError(error, `Label "${this._id}" text`);
    }
    return null;
  }
}
export const createLabel = (options: CreateLabelOptions): string =>
  new Label(options).id;
/**
 * @param labelID - String LabelID of the sprite to remove
 */
export const removeLabel = (labelID: string): void => {
  getDefinable<Label>(Label, labelID).remove();
};
