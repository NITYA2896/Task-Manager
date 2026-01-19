import { Edit, Trash, CheckCircle, Circle, Calendar } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
    const isCompleted = task.status === 'Completed';

    return (
        <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
            <div className="task-header">
                <h3 className="task-title" title={task.name}>
                    {task.name}
                </h3>
                <button
                    onClick={() => onToggleStatus(task)}
                    className={`status-toggle-btn ${isCompleted ? 'active' : ''}`}
                    title={isCompleted ? "Mark as Pending" : "Mark as Completed"}
                >
                    {isCompleted ? <CheckCircle size={22} /> : <Circle size={22} />}
                </button>
            </div>

            <p className="task-description">
                {task.description || "No description provided."}
            </p>

            <div className="task-footer">
                <div className="task-meta">
                    <div className="task-date">
                        <Calendar size={14} />
                        <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
                    </div>
                    <span className={`status-badge ${isCompleted ? 'status-completed' : 'status-pending'}`}>
                        {task.status}
                    </span>
                </div>

                <div className="task-actions">
                    <button onClick={() => onEdit(task)} className="action-btn edit-btn" title="Edit">
                        <Edit size={16} />
                    </button>
                    <button onClick={() => onDelete(task._id)} className="action-btn delete-btn" title="Delete">
                        <Trash size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
