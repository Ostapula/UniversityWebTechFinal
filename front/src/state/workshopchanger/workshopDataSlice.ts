import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkshopData {
    date: string,
    time: string,
    service: string,
}

const initialState: WorkshopData = {
    date: '',
    time: '',
    service: '',
};

const workshopDataSlice = createSlice({
    name: "workshopData",
    initialState,
    reducers: {
        setWorkshopData: (state, action: PayloadAction<WorkshopData>) => {
            return {...state, ...action.payload};
        },
    },
});

export const { setWorkshopData } = workshopDataSlice.actions;
export default workshopDataSlice.reducer;