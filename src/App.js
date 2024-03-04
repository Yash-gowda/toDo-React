import React from 'react';
import ToDoApp from './ToDoApp';
import { TasksProvider } from './TasksContext';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

function App() {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TasksProvider>
                <ToDoApp />
            </TasksProvider>
        </ThemeProvider>
    );
}

export default App;