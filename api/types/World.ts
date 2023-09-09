import { CollisionData } from "./CollisionData";
import { EntityCollidable } from "./EntityCollidable";
import { EntityPosition } from "./EntityPosition";
import { OverlapData } from "./OverlapData";
import { Pathing } from "./Pathing";

export interface Entity<CollisionLayer extends string> {
  readonly collidables: EntityCollidable<string>[];
  readonly collisionLayer: string | null;
  readonly height: number;
  readonly id: string;
  readonly onCollision: ((data: CollisionData<CollisionLayer>) => void) | null;
  readonly onOverlap: ((data: OverlapData<CollisionLayer>) => void) | null;
  pathing: Pathing | null;
  position: EntityPosition | null;
  readonly spriteInstanceID: string | null;
  readonly width: number;
  movementVelocity: {
    readonly x: number;
    readonly y: number;
  } | null;
  readonly zIndex: number;
}
export interface Layer<CollisionLayer extends string> {
  readonly entities: Map<string, Entity<CollisionLayer>>;
  readonly id: string;
  readonly tileSize: number;
  readonly tiles: {
    readonly id: number;
    readonly x: number;
    readonly y: number;
  }[];
  readonly tilesetID: string | null;
}
export interface Level {
  readonly height: number;
  readonly layers: Layer<string>[];
  readonly width: number;
}
export interface Tileset {
  readonly height: number;
  readonly imageSourceID: string;
  readonly tileSize: number;
  readonly tiles: WorldTilesetTile[];
  readonly width: number;
}
export interface WorldTilesetTile {
  readonly id: number;
  readonly isCollidable: boolean;
}
export interface World {
  readonly levels: Map<string, Level>;
  readonly tilesets: Map<string, Tileset>;
}
