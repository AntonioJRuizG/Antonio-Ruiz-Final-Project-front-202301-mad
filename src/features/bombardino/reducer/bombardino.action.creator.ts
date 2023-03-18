import { createAction } from "@reduxjs/toolkit";
import { BombardinoStructure } from "../model/bombardino.model";
import { bombardinoActions } from "./bombardino.actions.types";

export const loadCreator = createAction<BombardinoStructure[]>(
  bombardinoActions.load
);
export const addCreator = createAction<BombardinoStructure>(
  bombardinoActions.add
);
export const updateCreator = createAction<BombardinoStructure>(
  bombardinoActions.update
);
export const deleteCreator = createAction<BombardinoStructure["id"]>(
  bombardinoActions.delete
);
