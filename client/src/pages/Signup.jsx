import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ListTodo } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <div className="auth-logo">
                        <ListTodo size={40} color="#6366f1" />
                    </div>
                    <h2 className="auth-title">Create Account 🚀</h2>
                    <p className="auth-subtitle">Join us to organize your work</p>
                </div>

                {error && <p className="auth-error">{error}</p>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group icon-input-group">
                        <User className="input-icon" size={20} />
                        <input
                            type="text"
                            className="form-input with-icon"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group icon-input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            className="form-input with-icon"
                            placeholder="Email Address"
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
                        Sign Up
                    </button>
                </form>
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
