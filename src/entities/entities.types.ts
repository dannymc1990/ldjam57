import { Container } from "pixi.js";

export interface IEntity {
    onUpdate?: (entities: Container[]) => void
}