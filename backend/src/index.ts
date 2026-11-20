// backend/src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ['http://localhost:8100', 'http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);
app.use(express.json());

// Types matching your Angular models
type TaskStatus = 'pending' | 'in-progress' | 'completed';

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// In-memory mock database
let tasks: Task[] = [
  { id: '101', title: 'Task1', description: 'task1', status: 'in-progress' },
  { id: '102', title: 'Task2', description: 'task2', status: 'completed' },
  { id: '103', title: 'Task3', description: 'task3', status: 'pending' },
];

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET all tasks
app.get('/api/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// GET single task by ID
app.get('/api/tasks/:id', (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// POST create a new task
app.post('/api/tasks', (req: Request, res: Response) => {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: req.body.title,
    description: req.body.description || '',
    status: req.body.status || 'pending',
  };
  tasks = [newTask, ...tasks];
  res.status(201).json(newTask);
});

// PATCH update a task (handles both full updates and status-only updates)
app.patch('/api/tasks/:id', (req: Request, res: Response) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

// DELETE a task
app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== req.params.id);
  if (tasks.length === initialLength) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
