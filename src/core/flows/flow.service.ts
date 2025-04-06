import { createProvider, ProviderFactory } from "difunkt";
import { InitialFlow } from "./flow.providers";
import { IFlowable } from "./flow.types";

export const FlowService = createProvider(({ inject }) => {
    const initialFlow = inject(InitialFlow);

    function switchScene(Target: ProviderFactory<IFlowable>) {
        inject(Target).run(switchScene)
    }

    return {
        start() {
            initialFlow.run(switchScene)
        }
    }
})