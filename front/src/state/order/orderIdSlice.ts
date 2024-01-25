import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderData {
    computercase: number; 
    motherboard: number;  
    gpu: number;   
    cpu: number;            
    ram: number;
    memory: number;
    powersupply: number;
    cooler: number;
}

const initialState: OrderData = {
    computercase: 11, 
    motherboard: 11,  
    gpu: 11,   
    cpu: 11,            
    ram: 11,
    memory: 11,
    powersupply: 11,
    cooler: 11,
};

const orderDataSlice = createSlice({
    name: "orderData",
    initialState,
    reducers: {
        setorderData: (state, action: PayloadAction<OrderData>) => {
            return {...state, ...action.payload};
        },
    },
});

export const { setorderData } = orderDataSlice.actions;
export default orderDataSlice.reducer;