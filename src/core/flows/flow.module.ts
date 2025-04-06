import { createModule, provide, ProviderFactory } from "difunkt";
import { IFlowable } from "./flow.types";
import { FlowService } from "./flow.service";
import { InitialFlow } from "./flow.providers";

export const FlowModule = (flows: ProviderFactory<IFlowable>) => createModule({
    providers: [
        provide(InitialFlow, { value: flows }),
        FlowService
    ]
})