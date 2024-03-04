import React, { createContext, useContext, useState, useEffect } from 'react';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const value = {
        tasks,
        setTasks,
    };

    return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
