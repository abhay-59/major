const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/api/predict', (req, res) => {
    const { date, toc, san, dav } = req.body;
    
    const headers = {
        'Content-Type': 'application/json',
    };

    const data = {
        "data": [
            date, // Date from frontend
            toc,  // TOC from frontend
            san,  // SAN from frontend
            dav   // DAV from frontend
        ]
    };

    axios.post('https://prajwalswaroopsrivastava.ap-south-1.modelbit.com/v1/predict_load/latest', data, { headers: headers })
        .then(response => {
            res.json({ result: response.data['data'] });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error making API call');
        });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
