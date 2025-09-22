import { configureStore } from "@reduxjs/toolkit";
import route from "./route";
import user from "./user";
import category from "./category";
import { api } from "../services/api/base";

export const store = configureStore({
  reducer: { route, user, category, [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
export const { dispatch } = store;
