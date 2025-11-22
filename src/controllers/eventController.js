const knex = require('../../db/knex');
const Event = require('../models/event');
const { v4: uuidv4 } = require('uuid');

exports.createEvent = async (req, res) => {
  try {
    const { name, date, capacity } = req.body;
    if (!name || !date || capacity == null) {
      return res.status(400).json({ message: 'name, date, capacity are required' });
    }

    const id = uuidv4();
    const avail = capacity; 
    const now = new Date();

    await knex('events').insert({
      id,
      name,
      date,
      capacity,
      avail,
      created_at: now,
      updated_at: now
    });

    const ev = await Event.where({ id }).fetch({ require: true });
    return res.status(201).json(ev.toJSON());
  } catch (err) {
    console.error('Create event error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    let { start, end, page = 1, limit = 10 } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    const query = knex('events');

    if (start && end) {
      query.whereBetween('date', [start, end]);
    } else if (start) {
      query.where('date', '>=', start);
    } else if (end) {
      query.where('date', '<=', end);
    }

    const totalQuery = query.clone().count('* as count').first();
    const rowsQuery = query.clone().select('*').orderBy('date', 'asc').limit(limit).offset(offset);

    const [totalRes, rows] = await Promise.all([totalQuery, rowsQuery]);
    const total = parseInt(totalRes.count, 10);

    return res.json({ total, page, limit, events: rows });
  } catch (err) {
    console.error('Get events error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const ev = await Event.where({ id: req.params.id }).fetch({ require: false });
    if (!ev) return res.status(404).json({ message: 'Event not found' });
    return res.json(ev.toJSON());
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/events/:id (protected)
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, capacity } = req.body;

    const evModel = await Event.where({ id }).fetch({ require: false });
    if (!evModel) return res.status(404).json({ message: 'Event not found' });

    const ev = evModel.toJSON();
    const updates = {};
    if (name) updates.name = name;
    if (date) updates.date = date;

    if (capacity != null) {
      // adjust avail relative to old capacity
      const diff = capacity - ev.capacity;
      let newAvail = ev.avail + diff;
      if (newAvail < 0) newAvail = 0;
      updates.capacity = capacity;
      updates.avail = newAvail;
    }

    updates.updated_at = new Date();
    await knex('events').where({ id }).update(updates);

    const updated = await Event.where({ id }).fetch({ require: true });
    return res.json(updated.toJSON());
  } catch (err) {
    console.error('Update event error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/events/:id (protected)
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const evModel = await Event.where({ id }).fetch({ require: false });
    if (!evModel) return res.status(404).json({ message: 'Event not found' });

    await knex('events').where({ id }).del();
    return res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error('Delete event error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
