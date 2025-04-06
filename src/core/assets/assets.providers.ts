import { ModuleProviderList } from "difunkt";
import { AssetsService } from "./assets.service";

export function provideAssetServices(): ModuleProviderList {
    return [AssetsService]
}