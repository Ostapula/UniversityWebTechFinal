import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClientData {
    id: number;
    username: string;
    name: string;
    email: string;
    address: string;
    postalCode: string;
    city: string;
    phone: string;
}

const initialState: ClientData = {
    id: 0,
    username: '',
    name: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
};

const clientDataSlice = createSlice({
    name: "clientData",
    initialState,
    reducers: {
        setClientData: (state, action: PayloadAction<ClientData>) => {
            return {...state, ...action.payload};
        },
    },
});

export const { setClientData } = clientDataSlice.actions;
export default clientDataSlice.reducer;