import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log('Session Data:', data);
      if (data.session) {
        setUser(data.session.user);
      } else {
        console.error('No session found');
        // navigate('/'); // Redirect to login
      }
    };
    fetchSession();
  }, []);
  
  const handleCreateProject = async () => {
    const projectName = prompt('Enter project name:');
    const projectDescription = prompt('Enter project description:');

    if (projectName) {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            user_id: user.id,
            name: projectName,
            description: projectDescription,
          },
        ]);

      if (error) {
        console.error('Error creating project:', error.message);
      } else {
        setProjects([...projects, data[0]]);
      }
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/'); // Redirect to login
    } else {
      console.error('Error logging out:', error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user?.user_metadata?.name || 'User'}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Your Projects</h2>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <strong>{project.name}</strong>: {project.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects yet. Create one below!</p>
      )}
      <button onClick={handleCreateProject}>Add New Project</button>
    </div>
  );
};

export default Dashboard;
