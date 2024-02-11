import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const allTaskSlice = createSlice({
  name: 'allTask',
  initialState: {
    tasks: [],
    taskById: {},
  },

  reducers: {
    getAllTask: (state, action) => {
      state.tasks = action.payload;
    },
    getTaskById: (state, action) => {
      state.taskById = action.payload;
    },
  },
});

export const { getAllTask, getTaskById } = allTaskSlice.actions;
export default allTaskSlice.reducer;

export const fetchAllTask = () => async (dispatch) => {
  dispatch(getAllTask());
  try {
    const { data } = await axios.get('http://localhost:3001/task');
    dispatch(getAllTask(data));
  } catch (error) {
    dispatch(getAllTask(error.message));
  }
};

export const fetchTaskById = (id) => async (dispatch) => {
  dispatch(getTaskById());
  try {
    const { data } = await axios.get(`http://localhost:3001/task/${id}`);
    dispatch(getTaskById(data));
  } catch (error) {
    console.log('Error en fetchTaskById', error.message);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/task/delete/${id}`);
    dispatch(fetchAllTask());
  } catch (error) {
    console.log('Error en deleteTask', error.message);
  }
};

export const updateTask = (id, task) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:3001/task/update/${id}`, task);
    dispatch(fetchAllTask());
  } catch (error) {
    console.log('Error en updateTask', error.message);
  }
};
