const express = require('express');
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const { auth, requireAdmin } = require('../middleware/auth');
const dataStore = require('../dataStore');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, status, featured, page = 1, limit = 10 } = req.query;
    
    const query = { status: 'published' };
    
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    
    const allEvents = dataStore.getAllEvents();
  const events = allEvents
      .filter(event => event.status === 'published')
      .filter(event => !category || event.category === category)
      .filter(event => !featured || event.isFeatured === true)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice((page - 1) * limit, page * limit);

  const total = allEvents.filter(event => event.status === 'published').length;

    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('registeredParticipants', 'name email studentId');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Private (Admin only)
router.post('/', [
  auth,
  requireAdmin,
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('category').isIn(['Academic', 'Cultural', 'Sports', 'Technical', 'Workshop', 'Seminar', 'Other']).withMessage('Please select a valid category'),
  body('date').isISO8601().withMessage('Please provide a valid date'),
  body('startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Please provide a valid start time'),
  body('endTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Please provide a valid end time'),
  body('venue').trim().isLength({ min: 1 }).withMessage('Venue is required'),
  body('organizer').trim().isLength({ min: 1 }).withMessage('Organizer is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventData = {
      ...req.body,
      organizer: req.user._id
    };

    const event = new Event(eventData);
    await event.save();

    await event.populate('organizer', 'name');

    res.status(201).json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private (Admin only)
router.put('/:id', [
  auth,
  requireAdmin,
  body('title').optional().trim().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('description').optional().trim().isLength({ min: 1 }).withMessage('Description cannot be empty'),
  body('category').optional().isIn(['Academic', 'Cultural', 'Sports', 'Technical', 'Workshop', 'Seminar', 'Other']).withMessage('Please select a valid category'),
  body('date').optional().isISO8601().withMessage('Please provide a valid date'),
  body('startTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Please provide a valid start time'),
  body('endTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Please provide a valid end time'),
  body('venue').optional().trim().isLength({ min: 1 }).withMessage('Venue cannot be empty'),
  body('organizer').optional().trim().isLength({ min: 1 }).withMessage('Organizer cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    Object.assign(event, req.body);
    await event.save();

    await event.populate('organizer', 'name');

    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private (Admin only)
router.delete('/:id', [auth, requireAdmin], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/events/:id/approve
// @desc    Approve event
// @access  Private (Admin only)
router.post('/:id/approve', [auth, requireAdmin], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.isApproved = true;
    event.approvedBy = req.user._id;
    event.approvedAt = new Date();
    await event.save();

    await event.populate('organizer', 'name');
    await event.populate('approvedBy', 'name');

    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/events/admin/all
// @desc    Get all events for admin
// @access  Private (Admin only)
router.get('/admin/all', [auth, requireAdmin], async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .populate('approvedBy', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Event.countDocuments(query);

    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;