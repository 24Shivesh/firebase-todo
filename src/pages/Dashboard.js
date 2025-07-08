import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import TaskItem from '../components/TaskItem';

function Dashboard() {
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [user]);

  const addTask = async () => {
    if (!newTask) return;
    await addDoc(collection(db, 'tasks'), {
      title: newTask,
      status: 'pending',
      userId: user.uid,
      timestamp: serverTimestamp()
    });
    setNewTask('');
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  const toggleStatus = async (id) => {
    const task = tasks.find((t) => t.id === id);
    await updateDoc(doc(db, 'tasks', id), {
      status: task.status === 'done' ? 'pending' : 'done'
    });
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_#000] p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">My Tasks</h1>
          <button
            onClick={() => signOut(auth)}
            className="bg-red-500 text-white border-2 border-black px-3 py-1 rounded shadow-[3px_3px_0px_0px_#000] hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 px-4 py-2 border-2 border-black bg-gray-100 rounded shadow-[3px_3px_0px_0px_#000] focus:outline-none focus:ring-2 focus:ring-black"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
          />
          <button
            onClick={addTask}
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-green-600"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleStatus} onDelete={deleteTask} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
