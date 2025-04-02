import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userInfoReducer from './slices/userInfoSlice';
import projectReducer from './slices/projectSlice';
import aboutReducer from './slices/aboutSlice';
import contactReducer from './slices/contactSlice';
import stackReducer from './slices/stackSlice';
import frontendReducer from './slices/frontendSlice';
import linkReducer from './slices/linksSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
    project: projectReducer,
    aboutUser: aboutReducer,
    contact: contactReducer,
    stack: stackReducer,
    link: linkReducer,
    frontend: frontendReducer
  },
});

export default store;
