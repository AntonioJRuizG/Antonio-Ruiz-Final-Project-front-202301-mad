import { configureStore } from "@reduxjs/toolkit";
import { euphoniumReducer } from "../features/euphonium/reducer/euphonium.reducer";
import { userReducer } from "../features/user/reducer/user.reducer";
import { paginationReducer } from "../common/reducer/page.reducer/page.reducer";

export const store = configureStore({
  reducer: {
    loggedUser: userReducer,
    euphoniums: euphoniumReducer,
    page: paginationReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
