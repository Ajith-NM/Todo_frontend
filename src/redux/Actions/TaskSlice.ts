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
  task: Task[];
}

const initialState: TaskState = {
  task: [
    {
      task_Id: 0,
      title: "",
      description: "",
      status: "",
      user_Id: 0,
      createdAt: "",
      updatedAt: "",
    },
  ],
};

export const taskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    addAllTask: (state, action: PayloadAction<Task[]>) => {
      state.task = [...action.payload];
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.task = [...state.task, action.payload];
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.task = state.task.filter((task) => task.task_Id !== action.payload);
    },
  },
});

export const { addTask, removeTask, addAllTask } = taskSlice.actions;

export default taskSlice.reducer;
