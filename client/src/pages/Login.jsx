import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ListTodo } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <div className="auth-logo">
                        <ListTodo size={40} color="#6366f1" />
                    </div>
                    <h2 className="auth-title">Welcome Back 👋</h2>
                    <p className="auth-subtitle">Sign in to manage your tasks</p>
                </div>

                {error && <p className="auth-error">{error}</p>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group icon-input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            className="form-input with-icon"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group icon-input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            className="form-input with-icon"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-auth">
                        Sign In
                    </button>
                </form>
                <p className="auth-footer">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
