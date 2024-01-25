import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import gpu from "@/assets/graphics-card.png";

interface GPU {
    value: string;
}

const initialState: GPU = {
    value: gpu,
};

const gpuImageSlice = createSlice({
    name: "gpuChanger",
    initialState,
    reducers: {
        gpuChange: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
});


export const { gpuChange } = gpuImageSlice.actions;

export default gpuImageSlice.reducer;
