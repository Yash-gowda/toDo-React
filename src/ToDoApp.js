import React, { useState } from 'react';
import { Box, Button, Container, IconButton, List, ListItem, ListItemText, TextField, CircularProgress, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTasks } from './TasksContext';
import { useApi } from './useApi';
import { styled } from '@mui/material/styles';

const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#f0f2f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

//Footer text
const FooterText = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
}));

const ToDoApp = () => {
    const [task, setTask] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editText, setEditText] = useState('');
    const { tasks, setTasks } = useTasks();
    const { loading, request } = useApi();

    //edit functionality
    const handleEdit = (index) => {
        setIsEditing(index);
        setEditText(tasks[index]);
    };

    //save functionality
    const handleSave = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = editText;
        setTasks(updatedTasks);
        setIsEditing(null);
        request(() => Promise.resolve(updatedTasks));
    };

    //adding new task functionality
    const addTask = () => {
        if (!task.trim()) return;
        const newTasks = [...tasks, task];
        setTasks(newTasks);
        setTask('');
        request(() => Promise.resolve(newTasks));
    };

    //Deleting excisting task  functionality
    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        request(() => Promise.resolve(newTasks));
    };

    //when clicked on add task button
    const handleKeyDownAddTask = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    
    const handleKeyDownSave = (index, e) => {
        if (e.key === 'Enter') {
            handleSave(index);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#e8effa">
            <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#333', mt: 4 }}>
                Todo List App
            </Typography>
            <CustomContainer maxWidth="sm">
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
                    <TextField 
                        label="New Task" 
                        variant="outlined" 
                        fullWidth 
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        onKeyDown={handleKeyDownAddTask}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={addTask} sx={{ mb: 2 }}>
                        Add Task
                    </Button>
                </Box>
                <List sx={{ width: '100%' }}>
                    {tasks.map((item, index) => (
                        <ListItem key={index} secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)} sx={{ mr: 1 }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }>
                            {isEditing === index ? (
                                <TextField 
                                    variant="outlined"
                                    fullWidth 
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onBlur={() => handleSave(index)}
                                    onKeyDown={(e) => handleKeyDownSave(index, e)}
                                />
                            ) : (
                                <ListItemText primary={item} />
                            )}
                        </ListItem>
                    ))}
                </List>
            </CustomContainer>
            <FooterText variant="body2" color="textSecondary" align="center">
                This app was developed by Yashwanth Gowda B C
            </FooterText>
        </Box>
    );
};

export default ToDoApp;