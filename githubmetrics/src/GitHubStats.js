import React, { useState } from 'react';
import axios from 'axios';

const GitHubStats = () => {
    const [username, setUsername] = useState('');
    const [stats, setStats] = useState(null);

    const fetchStats = async () => {
        console.log('Fetching stats for:', username);
        try {
            const response = await axios.get(`http://localhost:5005/api/stats/${username}`);
            console.log('Response:', response.data);
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>user stats</h1>
            <input value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
            />
            <button onClick={fetchStats}>Submit</button>
            {stats && (<div>
                <p>Total repos: {stats.total_repos}</p>
                <p>Total forks: {stats.total_forks}</p>
                <p>Languages: {stats.languages}</p>
                </div>)}
        </div>
    );
};

export default GitHubStats;
