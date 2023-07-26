// src/reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import questionReducer from './questionReducer';
import formReducer from './formReducer';


const rootReducer = combineReducers({
    forms: formReducer,
    questions: questionReducer,
    // Add other reducers here if you have more
});

export default rootReducer;
