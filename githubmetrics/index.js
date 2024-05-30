const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express()
app.use(cors())

app.get('/api/stats/:username', async (req, res) => {
    const { username } = req.params;
    try {
        let page = 1;
        let repos = [];
        let moreRepos = true;

        while(moreRepos) {
            const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
                params: { per_page: 100, page}
            });
            repos = repos.concat(response.data); // add the repos to the list
            if (response.data.length < 100) {
                moreRepos = false; // if there are less than 100 more repos, we are done
            } else {
                page++; // next page
            }
        }

        const totalRepos = repos.length;

        res.json({
            total_repos: totalRepos,
        });
    } catch (error) {
        res.status(404).json({ message: 'error' });
    }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));