import { createReducer } from "@reduxjs/toolkit";
import { EuphoniumStructure } from "../model/euphonium.model";
import * as ac from "./euphonium.action.creator";

const initialState: EuphoniumStructure[] = [];

export const euphoniumReducer = createReducer(initialState, (builder) => {
  builder.addCase(ac.loadCreator, (_state, { payload }) => payload);
  builder.addCase(ac.addCreator, (state, { payload }) => [...state, payload]);
  builder.addCase(ac.updateCreator, (state, { payload }) =>
    state.map((item) => (item.id === payload.id ? payload : item))
  );
  builder.addCase(ac.deleteCreator, (state, { payload }) =>
    state.filter((item) => item.id !== payload)
  );

  builder.addDefaultCase((state) => state);
});
