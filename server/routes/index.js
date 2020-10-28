const express = require('express');
const router = express.Router();
const { executeQuery, executeUpdate } = require('../utils/db');

/* GET home page. */
router.get('/', async function(req, res, next) {
  // const r = await executeUpdate('INSERT INTO Board(name, created_at) VALUES ($1, $2) RETURNING id', ['Board 9', new Date()]);
  // const r = await executeQuery('SELECT * FROM board', []);
  res.send('Welcome to BOARD API');
});

module.exports = router;
