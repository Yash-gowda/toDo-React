import React, { createContext, useContext, useState, useEffect } from 'react';

const TasksContext = createContext();

// Custom hook for TasksContext
export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
    //State hook for managing the tasks
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks'); // An attempt to retrieve tasks from the local storage
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // value provided to consumers of the context.
    const value = {
        tasks,
        setTasks,
    };
    return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
