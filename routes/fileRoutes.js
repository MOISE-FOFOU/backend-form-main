const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/files/:name', (req, res) => {
    const filepath = path.join(__dirname, '../uploads', req.params.name);
    res.sendFile(filepath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

module.exports = router;