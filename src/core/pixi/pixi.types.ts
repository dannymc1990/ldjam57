import { ApplicationOptions } from "pixi.js";

export interface IPixiModuleOptions {
    mountTo: HTMLElement,
    application?: Partial<ApplicationOptions>
}