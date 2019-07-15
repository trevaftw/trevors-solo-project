const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const axios = require('axios');

router.get('/search/:id', rejectUnauthenticated, (req, res) => {
    //console.log('search hit')
    //console.log('req.params.id:', req.params.id)
    axios.get(`https://api.scryfall.com/cards/search?unique=prints&q=${req.params.id}`).then(response => {
        //console.log('response.data.data:', response.data.data)
        res.send(response.data.data)
    })
});

// router.get('/getSingle/:id', rejectUnauthenticated, (req, res) => {
//     //console.log('getSingle search hit')
//     //console.log('req.params.id:', req.params.id)
//     //console.log('req.user:', req.user)
//     pool.query(`
//     SELECT * FROM "user_cards" 
//     JOIN "cards" on "cards"."serial_id"="user_cards"."cards_id"
//     WHERE "user_cards"."user_id"=$1 AND "cards"."id"=$2
//     ORDER BY "cards"."name";`, [req.user.id, req.params.id]
//     ).then((response) => {
//         //console.log('/getUserCards/:id response.rows[0]:', response.rows[0])
//         res.send(response.rows[0])
//     }).catch(error => {
//         //console.log('error with getUserCards/:id:', error)
//         res.sendStatus(500)
//     })
// });


router.post('/updateUserTable/:id', rejectUnauthenticated, (req, res) => {
    // //console.log('updateUserTable route hit')
    //console.log('updateUserTable req.body:', req.body);
    //console.log('updateUserTable req.params:', req.params.id);
    pool.query(`
    INSERT INTO "user_cards" (user_id, cards_id, number_owned)
    VALUES ($1, $2, $3);`, [req.body.user_id, req.params.id, req.body.number]
    ).then(() => {
        res.sendStatus(200)
    }).catch(error => {
        //console.log('error with updateUserTable:', error)
        res.sendStatus(500)
    })
    //need to do the pool query
});

router.put('/updateCardDatabase', rejectUnauthenticated, (req, res) => {
    //console.log('api/cards/updateCardDatabase hit')
    // //console.log('put req.body:', req.body)
    pool.query(`
    UPDATE "cards" SET "price"=$1, "image_uris"=$3 WHERE "id"=$2
    RETURNING "serial_id";`, [req.body.price, req.body.scryfall_id, req.body.image]
    ).then((response) => {
        //console.log('put router response:', response.rows[0].serial_id)
        res.send(response.rows[0])
    }).catch(error => {
        //console.log('error with updateCardDatabase:', error)
        res.sendStatus(500)
    })
});

router.get('/getUserCards/:id', rejectUnauthenticated, (req, res) => {
    //console.log('/getUserCards/:id hit. req.params.id:', req.params.id);
    pool.query(`
    SELECT * FROM "user_cards" 
    JOIN "cards" on "cards"."serial_id"="user_cards"."cards_id"
    WHERE "user_cards"."user_id"=$1
    ORDER BY "cards"."name";`, [req.params.id]
    ).then((response) => {
        //console.log('/getUserCards/:id response.rows:', response.rows)
        //console.log('req.user:', req.user)
        res.send(response.rows)
    }).catch(error => {
        //console.log('error with getUserCards/:id:', error)
        res.sendStatus(500)
    })
})

router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
    //console.log('delete/:id route hit')
    //console.log('req.user:', req.user.id)
    //console.log('req.params.id', req.params.id)
    pool.query(`
    DELETE FROM "user_cards"
    WHERE "user_id"=$1 AND "cards_id"=$2
    RETURNING *;`, [req.user.id, req.params.id]
    ).then(response => {
        res.send(response.rows)
    }).catch(error => {
        //console.log('error with delete/:id:', error)
        res.sendStatus(500)
    })
})

router.put('/updateNumberOwned/:id', rejectUnauthenticated, (req, res) => {
    //console.log('updateNumberOwned/ hit')
    //console.log('req.paramds.id, req.user:', req.params.id, req.user.id, req.body.card_id)
    pool.query(`
    UPDATE "user_cards" 
    SET "number_owned"=$1
    WHERE "user_id"=$2 AND "cards_id"=$3
    RETURNING "user_id";`, [req.body.newValue, req.user.id, req.body.card_id]
    ).then((response) => {
        //console.log('updateNumberOwned/:idresponse:', response.rows[0].user_id)
        res.send(response.rows[0])
    }).catch(error => {
        //console.log('error with updateNumberOwned/:id:', error)
        res.sendStatus(500)
    })
});

module.exports = router;


// router.put('/updateSingleCard/:id', rejectUnauthenticated, (req, res) => {
//     //console.log('updateSingleCard hit')
//     //console.log('/updateSingleCard req.body:', req.body)
//     //console.log('/updateSingleCard/:id', req.params.id)
//     pool.query(`
//     UPDATE "user_cards" SET "number_owned"="number_owned"+$1, WHERE "cards_id"=$2;`, 
//     [Number(req.body.number), req.params.id]
//     ).then(() => {
//         res.sendStatus(200)
//     }).catch(error => {
//         //console.log('error with updateCardDatabase:', error)
//         res.sendStatus(500)
//     })
// });