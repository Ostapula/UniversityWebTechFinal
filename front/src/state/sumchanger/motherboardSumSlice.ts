import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Sum {
    value: number;
}

const initialState: Sum = {
    value: 0
};

const motherboardCaseSlice = createSlice({
    name: "motherboardCaseChanger",
    initialState,
    reducers: {
        motherboardCaseChange: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    },
});


export const { motherboardCaseChange } = motherboardCaseSlice.actions;

export default motherboardCaseSlice.reducer;
