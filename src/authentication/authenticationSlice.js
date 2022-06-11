import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: {
        message: ''
    },
    login: '',
    isLoading: false
};

export const authentication = createAsyncThunk(
    'authentication',
    async (data, { rejectWithValue }) => {
        try {
            return Promise.resolve(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(authentication.pending,  (state) => {
            state.isLoading = true;
        });
        builder.addCase(authentication.fulfilled,  (state, action) => {
            state.isLoading = false;
            state.login = action.payload.login;
            state.error = initialState.error;
        });
        builder.addCase(authentication.rejected,  (state, action) => {
            state.isLoading = false;
            state.error = { ...state.error, ...action.payload };
        });
    },

});

export const selectError = state => state.authentication.error;
export const selectLoading = state => state.authentication.isLoading;

export default authenticationSlice.reducer;