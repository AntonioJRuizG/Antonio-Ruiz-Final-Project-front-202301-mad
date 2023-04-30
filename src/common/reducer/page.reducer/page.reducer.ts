import { createReducer } from "@reduxjs/toolkit";
import * as ac from "./page.action.creator";

export type PaginationProps = {
  currentPage: number;
};

const initialState: {
  currentPage: number;
} = {
  currentPage: 1,
};

export const paginationReducer = createReducer(initialState, (builder) => {
  builder.addCase(ac.loadCreator, (_state, { payload }) => payload);
  builder.addDefaultCase((state) => state);
});
