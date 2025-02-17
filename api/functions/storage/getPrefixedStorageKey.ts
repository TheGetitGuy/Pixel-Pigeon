import { state } from "../../state";

export const getPrefixedStorageKey = (property: string): string => {
  if (state.values.gameID === null) {
    throw new Error("Attempted to get prefixed storage key with no game ID.");
  }
  return `pp-${state.values.gameID}-${property}`;
};
