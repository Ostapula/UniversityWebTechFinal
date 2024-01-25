import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import memory from "@/assets/hard-disk.png";

interface Memory {
    value: string;
}

const initialState: Memory = {
    value: memory,
};

const memoryImageSlice = createSlice({
    name: "memoryChanger",
    initialState,
    reducers: {
        memoryChange: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
});


export const { memoryChange } = memoryImageSlice.actions;

export default memoryImageSlice.reducer;
