import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import computerCase from "@/assets/computer-case.png";

interface ComputerCase {
    value: string;
}

const initialState: ComputerCase = {
    value: computerCase,
};

const computerCaseImageSlice = createSlice({
    name: "computercaseChanger",
    initialState,
    reducers: {
        computercaseChange: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});


export const { computercaseChange } = computerCaseImageSlice.actions;

export default computerCaseImageSlice.reducer;
