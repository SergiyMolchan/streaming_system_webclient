import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from './authentication'
import { roomReducer } from './room';

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        room: roomReducer,
    },
});

export default store;