import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { CalendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducers";



export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: CalendarReducer,
    auth: authReducer
});


