import { createAction } from "@reduxjs/toolkit";
import { EuphoniumStructure } from "../model/euphonium.model";
import { euphoniumActions } from "./euphonium.actions.types";

export const loadCreator = createAction<EuphoniumStructure[]>(
  euphoniumActions.load
);
export const addCreator = createAction<EuphoniumStructure>(
  euphoniumActions.add
);
export const updateCreator = createAction<EuphoniumStructure>(
  euphoniumActions.update
);
export const deleteCreator = createAction<EuphoniumStructure["id"]>(
  euphoniumActions.delete
);
