const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "species" 
        JOIN "class" ON "class_id" = "class"."id"
        ORDER BY "species"."id";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error selecting * from species', error);
        res.sendStatus(500);
    });
    
});

module.exports = router;