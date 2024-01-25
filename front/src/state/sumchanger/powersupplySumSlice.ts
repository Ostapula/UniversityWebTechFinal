import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Sum {
    value: number;
}

const initialState: Sum = {
    value: 0
};

const powersupplyCaseSlice = createSlice({
    name: "powersupplyCaseChanger",
    initialState,
    reducers: {
        powersupplyCaseChange: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    },
});


export const { powersupplyCaseChange } = powersupplyCaseSlice.actions;

export default powersupplyCaseSlice.reducer;
