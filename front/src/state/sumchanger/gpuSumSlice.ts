import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Sum {
    value: number;
}

const initialState: Sum = {
    value: 0
};

const gpuCaseSlice = createSlice({
    name: "gpuCaseChanger",
    initialState,
    reducers: {
        gpuCaseChange: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    },
});


export const { gpuCaseChange } = gpuCaseSlice.actions;

export default gpuCaseSlice.reducer;
