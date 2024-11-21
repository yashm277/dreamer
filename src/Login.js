import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function Login() {
  const [user, setUser] = useState(null);

  // Fetch session on component mount
  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user); // Store logged-in user info
        console.log('Session retrieved:', data.session.user);
      } else {
        console.log('No active session');
      }
    };
    fetchSession();
  }, []);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error signing in with Google:', error.message);
    } else {
    console.log(data);
      console.log('Login successful');
    }
  };
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    } else {
        setUser(null)
      console.log('Signout successful')
    }
  }
  return (
    <div>
      {user ? (
        <h1>Welcome, {user.email}</h1>
      ) : (
        <>
          <h1>Login</h1>
          <button onClick={handleLogin}>Sign in with Google</button>
        </>
      )}
        <button onClick={handleSignout}>Sign out</button>
    </div>
  );
}

export default Login;
