import {combineReducers} from "@reduxjs/toolkit";
import parkSlice from "./parkSlice";
import offerSlice from "./offerSlice";

const rootReducer = combineReducers({
    parkListReducer: parkSlice,
    offerListReducer: offerSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
