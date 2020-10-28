const express = require('express');
const router = express.Router();
const {executeQuery, executeUpdate } = require('../utils/db');

router.get('/', async function(req, res, next) {
  const r = await executeQuery('SELECT * FROM "user"', []);
  res.send(JSON.stringify(r));
});

router.get('/:id', async function(req, res, next) {
  const r = await executeQuery('SELECT * FROM "user" WHERE id=$1', [req.params.id]);
  res.send(JSON.stringify(r));
});

router.post('/', async function(req, res, next) {
  const r = await executeUpdate('INSERT INTO "user"(name, created_at) VALUES($1, $2) RETURNING *', [req.body.name, new Date()]);
  res.send(JSON.stringify(r));
});

router.put('/:id', async function(req, res, next) {
  const r = await executeUpdate('UPDATE "user" SET name=$1 WHERE id=$2 RETURNING *', [req.body.name, req.params.id]);
  res.send(JSON.stringify(r));
});


router.delete('/:id', async function(req, res, next) {
  const r = await executeUpdate('DELETE FROM "user" WHERE id=$1 RETURNING *', [req.params.id]);
  res.send(JSON.stringify(r));
});

module.exports = router;
