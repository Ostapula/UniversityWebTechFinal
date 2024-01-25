import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import cooler from "@/assets/cooler.png";

interface Cooler {
    value: string;
}

const initialState: Cooler = {
    value: cooler,
};

const coolerImageSlice = createSlice({
    name: "coolerChanger",
    initialState,
    reducers: {
        coolerChange: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
});


export const { coolerChange } = coolerImageSlice.actions;

export default coolerImageSlice.reducer;
