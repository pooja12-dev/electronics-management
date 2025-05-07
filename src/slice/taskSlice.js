import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase'; // import your Firebase instance
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';

const initialState = {
  tasks: [],
  loading: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setTasks, setLoading } = taskSlice.actions;

// Thunks to interact with Firestore
export const fetchTasks = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(setTasks(tasks));
  } catch (error) {
    console.error("Error fetching tasks:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const assignTask = (taskId, userId) => async (dispatch) => {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { assignedUserId: userId });
    dispatch(fetchTasks()); // Refresh tasks after assigning
  } catch (error) {
    console.error("Error assigning task:", error);
  }
};

export default taskSlice.reducer;
