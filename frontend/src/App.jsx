import { useEffect, useState } from 'react';
import apiClient from "./api/api";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from 'framer-motion'; 
import { SunIcon, MoonIcon, TrashIcon } from '@heroicons/react/24/outline'; 

function App() {
  const [todo, setTodo] = useState([]);
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark');

  
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  useEffect(() => {
    apiClient.get().then((res) => setTodo(res.data));
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await apiClient.post("", data);
    reset(); 
    const res = await apiClient.get();
    setTodo(res.data);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20">
        
      
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-black text-5xl bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            To-Do
          </h1>
          <button 
            onClick={() => setDark(!dark)}
            className="p-3 rounded-2xl bg-sky-100 dark:bg-slate-700 text-sky-600 dark:text-sky-400 hover:scale-110 transition-transform"
          >
            {dark ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>
        </div>

      
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Title</label>
              <input 
                {...register("title")}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-sky-500 dark:text-white"
                placeholder="What needs to be done?"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Description</label>
              <input
                {...register("description")}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-sky-500 dark:text-white"
                placeholder="Add some details..."
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-500/30 transition-all active:scale-95">
            Add Task
          </button>
        </form>

       
        <div className="space-y-4">
          <AnimatePresence>
            {todo.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className="group flex justify-between items-center p-5 rounded-2xl bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{item.description}</p>
                </div>
                <button className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <TrashIcon className="w-6 h-6" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
