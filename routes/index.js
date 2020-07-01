const express = require('express');
const socket = require('../socket');
const router = express.Router();

const {
	NODE_ID,
} = process.env;

/* GET home page. */
router.get('/', function(_, res) {
  res.render('index', { title: `Express ${NODE_ID}` });
});

router.post('/notify/:id', function(req, res, next) {
  try {
    const { params: { id }, body } = req;
    socket.notify(id, body);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
