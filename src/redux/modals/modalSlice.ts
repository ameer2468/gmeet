import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../store";

// Define a type for the slice state
interface ModalState {
    modalStatus: boolean;
    activeModal: string;
}

// Define the initial state using that type
const initialState: ModalState = {
   modalStatus: false,
   activeModal: ''
}

export const modalSlice = createSlice({
    name: 'modal',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        ModalStatus: (state, action: PayloadAction<boolean>) => {
            state.modalStatus = action.payload;
        },
        ActiveModal: (state, action: PayloadAction<any>) => {
            state.activeModal = action.payload;
        }
    },
})

export const { ModalStatus, ActiveModal } = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const modalReducer = (state: RootState) => state.modalStore;

export default modalSlice.reducer