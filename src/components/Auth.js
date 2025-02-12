import React, { useState } from 'react';
import { auth, signUpUser, signInUser } from '../services/firebase';

const Auth = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);
    const [authError, setAuthError] = useState(undefined);

    const handleAuth = async () => {
        try {
            if (isSignUp) {
                await signUpUser(email, password);
            } else {
                await signInUser(email, password);
            }

            setUser(auth.currentUser);
        } catch (error) {
            setAuthError(error.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input id="email" type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button className="btn btn-primary w-100" onClick={handleAuth}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>

                <div className="text-center mt-3">
                    <button className="btn btn-link" onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
                    </button>
                </div>

                {authError ? (
                    <div className="alert alert-danger">
                        {authError}
                    </div>
                ) : (<></>)}
            </div>
        </div>
    );
};

export default Auth;
