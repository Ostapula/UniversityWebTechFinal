import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Sum {
    value: number;
}

const initialState: Sum = {
    value: 0
};

const memoryCaseSlice = createSlice({
    name: "memoryCaseChanger",
    initialState,
    reducers: {
        memoryCaseChange: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    },
});


export const { memoryCaseChange } = memoryCaseSlice.actions;

export default memoryCaseSlice.reducer;
