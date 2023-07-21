import { Application } from "pixi.js";
import { Config } from "./types/Config";
import { State } from "./classes/State";
import { World } from "./types/World";

interface StateSchema {
  readonly app: Application | null;
  readonly cameraLockedEntityInstanceID: string | null;
  readonly config: Config | null;
  readonly currentTime: number;
  readonly hasDoneInputPressForTick: boolean;
  readonly hasInteracted: boolean;
  readonly heldGamepadButtons: number[];
  readonly heldKeys: string[];
  readonly isInitialized: boolean;
  readonly levelID: string | null;
  readonly loadedAssets: number;
  readonly onTickCallbacks: (() => void)[];
  readonly world: World | null;
}
export const state: State<StateSchema> = new State<StateSchema>({
  app: null,
  cameraLockedEntityInstanceID: null,
  config: null,
  currentTime: 0,
  hasDoneInputPressForTick: false,
  hasInteracted: false,
  heldGamepadButtons: [],
  heldKeys: [],
  isInitialized: false,
  levelID: null,
  loadedAssets: 0,
  onTickCallbacks: [],
  world: null,
});