import { ModuleProviderList } from "difunkt";
import { LoggerService } from "./logger.service";


export function provideLogger(appName: string): ModuleProviderList {
    return [LoggerService, {
        provide: 'logger-prefix', value: appName
    }]
}