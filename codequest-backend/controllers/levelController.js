const axios = require('axios'); // Use Axios to call the Python service

exports.validateCode = async (req, res) => {
    const userCode = req.body.code;

    if (!userCode) {
        return res.status(400).json({ error: 'Code is required' });
    }

    try {
        // Call Python backend for validation (Level 1)
        const response = await axios.post('http://localhost:5000/verify', { code: userCode, level: 1 });
        const result = response.data;

        if (result.correct) {
            return res.status(200).json({ success: true, message: 'Correct output for Level 1!' });
        } else {
            return res.status(400).json({ success: false, error: result.error });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Validation failed. Please try again later.' });
    }
};

exports.validateCodeLevel2 = async (req, res) => {
    const userCode1 = req.body.code;  // Using the correct variable for Level 2

    if (!userCode1) {
        return res.status(400).json({ error: 'Code is required' });
    }

    try {
        // Call Python backend for validation (Level 2)
        const response = await axios.post('http://localhost:5000/verify', { code: userCode1, level: 2 });
        const result = response.data;

        if (result.correct) {
            return res.status(200).json({ success: true, message: 'Correct output for Level 2!' });
        } else {
            return res.status(400).json({ success: false, error: result.error });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Validation failed. Please try again later.' });
    }
};

// New handler for Level 3 validation
exports.validateCodeLevel3 = async (req, res) => {
    const userCode2 = req.body.code;  // Using the correct variable for Level 3

    if (!userCode2) {
        return res.status(400).json({ error: 'Code is required' });
    }

    try {
        // Call Python backend for validation (Level 3)
        const response = await axios.post('http://localhost:5000/verify', { code: userCode2, level: 3 });
        const result = response.data;

        if (result.correct) {
            return res.status(200).json({ success: true, message: 'Correct output for Level 3!' });
        } else {
            return res.status(400).json({ success: false, error: result.error });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Validation failed. Please try again later.' });
    }
};
