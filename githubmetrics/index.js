const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express()
app.use(cors())

app.get('/api/stats/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            params: { per_page: 1, page: 1 }
        });
        const firstRepo = response.data[0];

        const totalStars = firstRepo.stargazers_count;

        res.json({
            total_stars: totalStars,
        });
    } catch (error) {
        res.status(404).json({ message: 'error' });
    }
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));