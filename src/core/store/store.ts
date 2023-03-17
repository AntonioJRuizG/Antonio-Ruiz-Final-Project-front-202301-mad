import { configureStore } from "@reduxjs/toolkit";
import { bombardinoReducer } from "../../features/user/reducer/bombardino.reducer";
import { userReducer } from "../../features/user/reducer/user.reducer";

export const store = configureStore({
  reducer: {
    users: userReducer,
    bombardinos: bombardinoReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
