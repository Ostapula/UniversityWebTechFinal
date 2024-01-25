import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Sum {
    value: number;
}

const initialState: Sum = {
    value: 0
};

const coolerCaseSlice = createSlice({
    name: "coolerCaseChanger",
    initialState,
    reducers: {
        coolerCaseChange: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    },
});


export const { coolerCaseChange } = coolerCaseSlice.actions;

export default coolerCaseSlice.reducer;
