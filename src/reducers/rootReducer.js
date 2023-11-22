import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { studentReducer } from "./studentReducer";
import { uiReducer } from "./uiReducer";
import { paramsReducer } from "./paramsReducer";
import { reportsReducer } from "./reportsReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  student: studentReducer,
  params: paramsReducer,
  reports: reportsReducer,
});
