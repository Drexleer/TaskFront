import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// const apiUrl = process.env.URL;
// console.log(apiUrl);

// const API_URL = `${apiUrl}/task`;
const API_URL = 'https://taskbackend-1vwe.onrender.com';

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/newTask`, taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default taskSlice.reducer;
