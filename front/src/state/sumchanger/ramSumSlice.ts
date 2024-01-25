import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Sum {
    value: number;
}

const initialState: Sum = {
    value: 0
};

const ramCaseSlice = createSlice({
    name: "ramCaseChanger",
    initialState,
    reducers: {
        ramCaseChange: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    },
});


export const { ramCaseChange } = ramCaseSlice.actions;

export default ramCaseSlice.reducer;
