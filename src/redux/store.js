import { configureStore } from '@reduxjs/toolkit';
import { createTask } from './Slices/createTask';
import allTaskReducer from './Slices/getAllTask';
import userReducer from './Slices/userSlice';

const store = configureStore({
  reducer: {
    createTask: createTask,
    allTasks: allTaskReducer,
    user: userReducer,
  },
});

export default store;
