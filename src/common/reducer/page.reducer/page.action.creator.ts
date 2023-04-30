import { createAction } from "@reduxjs/toolkit";
import { PaginationProps } from "./page.reducer";
import { paginationActions } from "./page.actions.types";

export const loadCreator = createAction<PaginationProps>(
  paginationActions.load
);
