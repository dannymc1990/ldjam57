export interface TileLayer {
    arrayMode: number;
    data: number[]; 
    exportMode: number;
    gridCellHeight: number;
    gridCellWidth: number;
    gridCellsX: number;
    gridCellsY: number;
    name: string;
    offsetX: number;
    offsetY: number;
    tileset: string;
    _eid : string;
}

export interface EntityLayer {
    entities: Entity[];
    gridCellHeight: number;
    gridCellWidth: number;
    gridCellsX: number;
    gridCellsY: number;
    name: string;
    offsetX: number;
    offsetY: number;
    _eid : string;
}

export interface Entity {
    height: number;
    id: number;
    name: string;
    originX: number;
    originY: number;
    width: number;
    x: number;
    y: number;
    _eid: string;
}

export type LevelLayers = (TileLayer | EntityLayer) []; 

export interface LevelJson {
    height: number;
    layers: LevelLayers;
    offsetX: number;
    offsetY: number;
    ogmoVersion: string;
    width: number;
}
