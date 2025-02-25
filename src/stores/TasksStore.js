import { create } from 'zustand';

const TasksStore = create((set) => ({
  tasks: [],
  currentTask: null,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updates) => set((state) => ({
    tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
  })),
  deleteTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId)
  })),
  setCurrentTask: (task) => set({ currentTask: task }),
  clearCurrentTask: () => set({ currentTask: null })
}));

export default TasksStore;
