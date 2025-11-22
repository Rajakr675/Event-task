const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getEventById
} = require('../controllers/eventController');

router.get('/', getEvents);
router.get('/:id', getEventById);

router.post('/create', auth, createEvent);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);

module.exports = router;
