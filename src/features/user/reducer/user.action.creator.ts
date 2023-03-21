import { createAction } from "@reduxjs/toolkit";
import { UserStructure } from "../model/user.model";
import { usersActions } from "./user.actions.types";

export const loadCreator = createAction<UserStructure>(usersActions.load);

export const addCreator = createAction<UserStructure>(usersActions.add);

export const updateCreator = createAction<UserStructure>(usersActions.update);

export const deleteCreator = createAction<UserStructure["id"]>(
  usersActions.delete
);
