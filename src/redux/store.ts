import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {userSlice} from "./user/userSlice";
import {modalSlice} from "./modals/modalSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist'

const reducers = combineReducers({
    userStore: userSlice.reducer,
    modalStore: modalSlice.reducer

})

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            }
        })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store