import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice"
import adminReducer from "./slices/AdminSlice"
import { persistReducer,persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    user: userReducer,
    admin:adminReducer
});

const persistConfig = {
    key : "root",
    storage,
    whitelist :["user","admin"]
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store);