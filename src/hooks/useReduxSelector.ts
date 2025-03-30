import { RootState } from '../store/index.ts';
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;