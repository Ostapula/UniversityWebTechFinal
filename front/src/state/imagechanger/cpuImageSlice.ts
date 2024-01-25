import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import cpu from "@/assets/processor.png";

interface CPU {
    value: string;
}

const initialState: CPU = {
    value: cpu,
};

const cpuImageSlice = createSlice({
    name: "cpuChanger",
    initialState,
    reducers: {
        cpuChange: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
});


export const { cpuChange } = cpuImageSlice.actions;

export default cpuImageSlice.reducer;