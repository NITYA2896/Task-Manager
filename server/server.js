const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const { protect } = require('./middleware/authMiddleware');
const { registerUser, loginUser } = require('./controllers/authController');
const { getTasks, createTask, updateTask, deleteTask } = require('./controllers/taskController');

const port = process.env.PORT || 5000;
const dns = require('dns');
// Force Google DNS to resolve Atlas SRV records
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    console.log('Using Google DNS for MongoDB Atlas resolution');
} catch (e) {
    console.error('Failed to set DNS servers:', e);
}

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todoapp';

mongoose.connect(mongoURI, { family: 4 })
    .then(() => {
        console.log('MongoDB Connected');
    }).catch(err => {
        console.error('MongoDB Connection Error:', err);
    });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Auth Routes
const authRouter = express.Router();
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
app.use('/api/auth', authRouter);

// Task Routes
const taskRouter = express.Router();
taskRouter.get('/', protect, getTasks);
taskRouter.post('/', protect, createTask);
taskRouter.put('/:id', protect, updateTask);
taskRouter.delete('/:id', protect, deleteTask);
app.use('/api/tasks', taskRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
