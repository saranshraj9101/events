const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Event category is required'],
    enum: ['Academic', 'Cultural', 'Sports', 'Technical', 'Workshop', 'Seminar', 'Other']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required']
  },
  venue: {
    type: String,
    required: [true, 'Event venue is required']
  },
  organizer: {
    type: String,
    required: [true, 'Event organizer is required']
  },
  maxParticipants: {
    type: Number,
    default: null
  },
  registeredParticipants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  registrationDeadline: {
    type: Date,
    default: null
  },
  isRegistrationRequired: {
    type: Boolean,
    default: false
  },
  isFree: {
    type: Boolean,
    default: true
  },
  fee: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: null
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ isFeatured: 1 });

// Virtual for checking if event is full
eventSchema.virtual('isFull').get(function() {
  if (!this.maxParticipants) return false;
  return this.registeredParticipants.length >= this.maxParticipants;
});

// Virtual for checking if registration is open
eventSchema.virtual('isRegistrationOpen').get(function() {
  if (!this.isRegistrationRequired) return false;
  if (this.registrationDeadline && new Date() > this.registrationDeadline) return false;
  return !this.isFull;
});

// Method to check if user can register
eventSchema.methods.canRegister = function(userId) {
  if (!this.isRegistrationRequired) return false;
  if (!this.isRegistrationOpen) return false;
  return !this.registeredParticipants.includes(userId);
};

module.exports = mongoose.model('Event', eventSchema);