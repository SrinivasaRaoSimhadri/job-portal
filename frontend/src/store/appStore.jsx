import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.jsx";

const appStore = configureStore({
    reducer: {
        user: userSlice
    }
})

export default appStore;