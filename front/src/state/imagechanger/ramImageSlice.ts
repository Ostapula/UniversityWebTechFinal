import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ram from "@/assets/memoryram.png";

interface RAM {
    value: string;
}

const initialState: RAM = {
    value: ram,
};

const ramImageSlice = createSlice({
    name: "ramChanger",
    initialState,
    reducers: {
        ramChange: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
});


export const { ramChange } = ramImageSlice.actions;

export default ramImageSlice.reducer;
