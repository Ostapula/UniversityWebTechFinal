import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import powersupply from "@/assets/power-supply.png";

interface PowerSupply {
    value: string;
}

const initialState: PowerSupply = {
    value: powersupply,
};

const powersupplyImageSlice = createSlice({
    name: "powersupplyChanger",
    initialState,
    reducers: {
        powersupplyChange: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
});


export const { powersupplyChange } = powersupplyImageSlice.actions;

export default powersupplyImageSlice.reducer;
