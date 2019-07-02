const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');

router.get('/search/:id', rejectUnauthenticated, (req, res) => {
    console.log('search hit')
    console.log('req.params.id:', req.params.id)
    axios.get(`https://api.scryfall.com/cards/search?unique=prints&q=${req.params.id}`).then(response => {
        console.log('response.data.data:', response.data.data)
        res.send(response.data.data)
    })
});


router.post('/', (req, res) => {

});

module.exports = router;