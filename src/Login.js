import React, { useEffect } from 'react';
import { supabase } from './supabaseClient';

const Login = () => {
  // Use useEffect inside the component
  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error.message);
      } else if (data.session) {
        const user = data.session.user;
        console.log('User ID:', user.id);
        console.log('Email:', user.email);
        console.log('Name:', user.user_metadata.name); // Name from Google
        console.log('Avatar:', user.user_metadata.avatar_url); // Avatar from Google
      }
    };

    fetchSession();
  }, []); // Dependency array ensures it runs once after the component mounts
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      console.log('User signed out!');
    }
  };
  
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  );
};

export default Login;
