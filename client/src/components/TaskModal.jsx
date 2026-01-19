import { useState, useEffect } from 'react';
import { X, Calendar, Type, AlignLeft } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onSave, taskToEdit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setName(taskToEdit.name);
            setDescription(taskToEdit.description || '');
            setDueDate(taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : '');
        } else {
            setName('');
            setDescription('');
            setDueDate('');
        }
    }, [taskToEdit, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, description, dueDate });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{taskToEdit ? 'Modify Task' : 'Add New Task'}</h2>
                    <button onClick={onClose} className="close-btn">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group icon-input-group">
                        <Type className="input-icon" size={20} />
                        <input
                            type="text"
                            className="form-input with-icon"
                            placeholder="Task Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group icon-input-group">
                        <Calendar className="input-icon" size={20} />
                        <input
                            type="date"
                            className="form-input with-icon"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group icon-input-group">
                        <AlignLeft className="input-icon" size={20} />
                        <textarea
                            className="form-input with-icon"
                            placeholder="Task Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            style={{ resize: 'none', paddingTop: '1rem', minHeight: '120px' }}
                        />
                    </div>
                    <button type="submit" className="btn-modal">
                        {taskToEdit ? 'Save Changes' : 'Create Task'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
