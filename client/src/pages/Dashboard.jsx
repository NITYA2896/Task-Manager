import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import axios from 'axios';
import { Plus } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, config);
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line
    }, [user]);

    const handleSaveTask = async (taskData) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        try {
            if (taskToEdit) {
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/tasks/${taskToEdit._id}`,
                    taskData,
                    config
                );
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, taskData, config);
            }
            fetchTasks();
            setIsModalOpen(false);
            setTaskToEdit(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, config);
                fetchTasks();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleToggleStatus = async (task) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        try {
            const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
                { status: newStatus },
                config
            );
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const openAddModal = () => {
        setTaskToEdit(null);
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    // Filter Logic
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.status === 'Completed';
        if (filter === 'pending') return task.status === 'Pending';
        if (filter === 'today') {
            if (!task.dueDate) return false;
            const today = new Date().toISOString().split('T')[0];
            return task.dueDate.split('T')[0] === today;
        }
        return true;
    });

    return (
        <div className="app-layout">
            <Sidebar filter={filter} setFilter={setFilter} />
            <main className="main-content">
                <header className="dashboard-header">
                    <div className="user-welcome">
                        <h1>Hello, {user && user.name}</h1>
                        <p className="date-display">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <button onClick={openAddModal} className="add-task-btn">
                        <Plus size={20} />
                        <span>Add New Task</span>
                    </button>
                </header>

                <div className="tasks-container">
                    <div className="tasks-header-row">
                        <h2>{filter === 'all' ? 'All Tasks' : filter === 'today' ? "Today's Tasks" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks`}</h2>
                        <span className="task-count">{filteredTasks.length} tasks</span>
                    </div>

                    {isLoading ? (
                        <div className="empty-state">
                            <h3>Loading your tasks...</h3>
                            <p>Connecting to the cloud...</p>
                        </div>
                    ) : filteredTasks.length > 0 ? (
                        <div className="task-grid">
                            {filteredTasks.map((task) => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    onEdit={openEditModal}
                                    onDelete={handleDeleteTask}
                                    onToggleStatus={handleToggleStatus}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <Plus size={48} opacity={0.2} />
                            </div>
                            <h3>No tasks found</h3>
                            <p>You don't have any {filter !== 'all' ? filter : ''} tasks yet.</p>
                            <button onClick={openAddModal} className="add-task-link">Create one now</button>
                        </div>
                    )}
                </div>

                <TaskModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveTask}
                    taskToEdit={taskToEdit}
                />
            </main>
        </div>
    );
};

export default Dashboard;
