import { createProviderToken } from "difunkt";
import { IPixiModuleOptions } from "./pixi.types";
import { Application } from "pixi.js";

export const PixiModuleOptions = createProviderToken<IPixiModuleOptions>()
export const PixiApplication = createProviderToken<Application>();