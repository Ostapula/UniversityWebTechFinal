import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Sum {
    value: number;
}

const initialState: Sum = {
    value: 0
};

const cpuCaseSlice = createSlice({
    name: "cpuCaseChanger",
    initialState,
    reducers: {
        cpuCaseChange: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    },
});


export const { cpuCaseChange } = cpuCaseSlice.actions;

export default cpuCaseSlice.reducer;
