// Require dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Set up API export
const api = express.Router();
module.exports = api;

// Require database module
const db = require('./db-datastore');

// Get register value
api.get('/:reg(\\w+)', async (req, res) => {
  try {
    res.send(await db.get(req.params.reg));
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
