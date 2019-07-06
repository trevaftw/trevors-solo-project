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


router.post('/updateUserTable/:id', rejectUnauthenticated, (req, res) => {
    // console.log('updateUserTable route hit')
    console.log('updateUserTable req.body:', req.body);
    console.log('updateUserTable req.params:', req.params.id);
    pool.query(`
    INSERT INTO "user_cards" (user_id, cards_id, number_owned)
    VALUES ($1, $2, $3);`, [req.body.user_id, req.params.id, req.body.number]
    ).then( () => {
        res.sendStatus(200)
    }).catch(error => {
        console.log('error with updateUserTable:', error)
        res.sendStatus(500)
    })
//need to do the pool query
});

router.put('/updateCardDatabase', rejectUnauthenticated, (req, res) => {
    console.log('api/cards/updateCardDatabase hit')
    // console.log('put req.body:', req.body)
    pool.query(`
    UPDATE "cards" SET "price"=$1, "image_uris"=$3 WHERE "id"=$2
    RETURNING "serial_id";`, [req.body.price, req.body.scryfall_id, req.body.image]
    ).then( (response) => {
        console.log('put router response:', response.rows[0].serial_id)
        res.send(response.rows[0])
    }).catch(error => {
        console.log('error with updateCardDatabase:', error)
        res.sendStatus(500)
    })
});

module.exports = router;