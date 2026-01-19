import { LayoutDashboard, CheckSquare, ListTodo, CalendarDays, LogOut } from 'lucide-react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Sidebar = ({ filter, setFilter }) => {
    const { logout } = useContext(AuthContext);

    const menuItems = [
        { id: 'all', label: 'All Tasks', icon: <ListTodo size={20} /> },
        { id: 'completed', label: 'Completed Tasks', icon: <CheckSquare size={20} /> },
        { id: 'pending', label: 'Pending Tasks', icon: <LayoutDashboard size={20} /> },
        { id: 'today', label: "Today's Tasks", icon: <CalendarDays size={20} /> },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="logo-icon">
                    <ListTodo size={24} color="white" />
                </div>
                <h2>Task Manager</h2>
            </div>
            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {menuItems.map((item) => (
                        <li key={item.id} className="nav-item">
                            <button
                                onClick={() => setFilter(item.id)}
                                className={`nav-btn ${filter === item.id ? 'active' : ''}`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-footer">
                <button onClick={logout} className="logout-btn">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
