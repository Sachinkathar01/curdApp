

import { configureStore } from '@reduxjs/toolkit';
import userDetailsReducer from '../fetures/usersDetails';






export const store = configureStore({
    reducer:{
        app:userDetailsReducer 
    }
})