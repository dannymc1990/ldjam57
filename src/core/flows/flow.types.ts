import { ProviderFactory } from "difunkt";

export interface IFlowable {
    run(switchScene: (target: ProviderFactory<IFlowable>) => void): Promise<any>,
}

export type Flow = { target: ProviderFactory<IFlowable>, condition: () => boolean }