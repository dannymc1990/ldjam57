import { createProviderToken, ProviderFactory } from "difunkt";
import { IFlowable } from "./flow.types";

export const InitialFlow = createProviderToken<IFlowable>();