import { removeQuadrilateral } from "../classes/Quadrilateral";
import { removeSprite } from "../classes/Sprite";
import { state } from "../state";

/**
 * Removes the given entity from the world
 * @param entityID - String entityID of the entity to remove
 */
export const removeEntity = (entityID: string): void => {
  if (state.values.world === null) {
    throw new Error(
      `An attempt was made to remove entity instance "${entityID}" before world was loaded.`,
    );
  }
  for (const level of state.values.world.levels.values()) {
    for (const layer of level.layers) {
      for (const [layerEntityID, layerEntity] of layer.entities) {
        if (layerEntityID === entityID) {
          for (const entitySprite of layerEntity.sprites) {
            removeSprite(entitySprite.spriteID);
          }
          for (const entityQuadrilateral of layerEntity.quadrilaterals) {
            removeQuadrilateral(entityQuadrilateral.quadrilateralID);
          }
          layer.entities.delete(layerEntityID);
        }
      }
    }
  }
};
