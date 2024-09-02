import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type Task = {
  task_Id: number;
  title: string;
  description: string;
  status: string;
  user_Id: number;
  createdAt: string;
  updatedAt: string;
};
export interface TaskState {
  task: Task;
}

const initialState: TaskState = {
  task: {
    task_Id: 0,
    title: "",
    description: "",
    status: "",
    user_Id: 0,
    createdAt: "",
    updatedAt: "",
  },
};

export const taskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    removeTask: (state) => {
      state.task = initialState.task;
    },
  },
});

export const { addTask, removeTask } = taskSlice.actions;

export default taskSlice.reducer;
