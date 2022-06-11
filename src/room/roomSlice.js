import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: {
        message: ''
    },
    login: '',
    isLoading: false
};

export const room = createAsyncThunk(
    'room',
    async (data, { rejectWithValue }) => {
        try {
            return Promise.resolve(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(room.pending,  (state) => {
            state.isLoading = true;
        });
        builder.addCase(room.fulfilled,  (state, action) => {
            state.isLoading = false;
            state.login = action.payload.login;
            state.error = initialState.error;
        });
        builder.addCase(room.rejected,  (state, action) => {
            state.isLoading = false;
            state.error = { ...state.error, ...action.payload };
        });
    },

});

export const selectError = state => state.room.error;
export const selectLoading = state => state.room.isLoading;

export default roomSlice.reducer;