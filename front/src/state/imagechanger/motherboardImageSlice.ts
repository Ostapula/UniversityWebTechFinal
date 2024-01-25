import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import motherboard from "@/assets/motherboard.png";

interface Motherboard {
    value: string;
}

const initialState: Motherboard = {
    value: motherboard,
};

const motherboardImageSlice = createSlice({
    name: "motherboardChanger",
    initialState,
    reducers: {
        motherboardChange: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
});


export const { motherboardChange } = motherboardImageSlice.actions;

export default motherboardImageSlice.reducer;
