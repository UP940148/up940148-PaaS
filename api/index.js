// Require dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Set up API export
const api = express.Router();
module.exports = api;

// Enable CORS
api.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Require database module
const db = require('./db-datastore');

// Get register value
api.get('/:reg(\\w+)', async (req, res) => {
  try {
    // Set header to text/plain, otherwise text/HTML is assumed by default
    res.setHeader('content-type', 'text/plain');
    res.send(`${await db.get(req.params.reg)}`);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// Delete register
api.delete('/:reg(\\w+)', async (req, res) => {
  try {
    // Delete register, if successful return 204
    await db.delete(req.params.reg);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.use(bodyParser.text());

// Set register value
api.put('/:reg(\\w+)', async (req, res) => {
  // If body isn't a number, send 400
  if (isNaN(req.body)) {
    res.sendStatus(400);
  }

  try {
    res.setHeader('content-type', 'text/plain');
    // Set register value and return value
    await db.put(req.params.reg, Number(req.body));
    res.send(req.body);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// Add to register value
api.post('/:reg(\\w+)', async (req, res) => {
  // If body isn't a number, send 400
  if (isNaN(req.body)) {
    res.sendStatus(400);
  }

  try {
    res.setHeader('content-type', 'text/plain');
    // Update register value and return new total
    res.send(`${await db.post(req.params.reg, Number(req.body))}`);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});
