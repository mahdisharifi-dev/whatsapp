import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

export default configureStore({
    reducer: {
        user: userSlice
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());