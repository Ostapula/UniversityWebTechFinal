import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Sum {
    value: number;
}

const initialState: Sum = {
    value: 0
};

const sumCompCaseSlice = createSlice({
    name: "sumComCaseChanger",
    initialState,
    reducers: {
        sumComCaseChange: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    },
});


export const { sumComCaseChange } = sumCompCaseSlice.actions;

export default sumCompCaseSlice.reducer;
