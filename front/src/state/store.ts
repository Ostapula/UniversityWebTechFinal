import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import computerCaseImageReducer from "./imagechanger/computerCaseImageSlice";
import motherboardImageReducer from "./imagechanger/motherboardImageSlice";
import gpuImageReducer from "./imagechanger/gpuImageSlice";
import cpuImageReducer from "./imagechanger/cpuImageSlice";
import ramImageReducer from "./imagechanger/ramImageSlice";
import memoryImageReducer from "./imagechanger/memoryImageSlice";
import powersupplyImageReducer from "./imagechanger/powersupplyImageSlice";
import coolerImageReducer from "./imagechanger/coolerImageSlice";
import sumReducer from "./sumchanger/compSumSlice";
import motherboardSumReducer from "./sumchanger/motherboardSumSlice";
import gpuSumReducer from "./sumchanger/gpuSumSlice";
import cpuSumReducer from "./sumchanger/cpuSumSlice";
import ramSumReducer from "./sumchanger/ramSumSlice";
import memorySumReducer from "./sumchanger/memorySumSlice";
import powersupplySumReducer from "./sumchanger/powersupplySumSlice";
import coolerSumReducer from "./sumchanger/coolerSumSlice";
import clientDataReducer from "./userschanger/clientDataSlice";
import orderIdReducer from "./order/orderIdSlice";
import workshopDataReducer from "./workshopchanger/workshopDataSlice";

const rootReducer = combineReducers({
    clientData: clientDataReducer,
    computercasechanger: computerCaseImageReducer,
    motherboardchanger: motherboardImageReducer,
    gpuchanger: gpuImageReducer,
    cpuchanger: cpuImageReducer,
    ramchanger: ramImageReducer,
    memorychanger: memoryImageReducer,
    powersupplychanger: powersupplyImageReducer,
    coolerchanger: coolerImageReducer,
    sumchanger: sumReducer,
    mothersumchanger: motherboardSumReducer,
    gpusumchanger: gpuSumReducer,
    cpusumchanger: cpuSumReducer,
    ramsumchanger: ramSumReducer,
    memorysumchanger: memorySumReducer,
    powersupplysumchanger: powersupplySumReducer,
    coolersumchanger: coolerSumReducer,
    orderData: orderIdReducer,
    workshopData: workshopDataReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['clientData'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;