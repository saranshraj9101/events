// Simple in-memory data store for development
class InMemoryStore {
  constructor() {
    this.users = [
      {
        _id: '1',
        name: 'Admin User',
        email: 'admin@bennett.edu',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'admin',
        department: 'Administration',
        year: '1st Year',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        name: 'Student User',
        email: 'student@bennett.edu',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'student',
        department: 'Computer Science',
        year: '2nd Year',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    this.events = [
      {
        _id: '1',
        title: 'Welcome to Bennett University',
        description: 'An orientation event for new students to learn about campus facilities and meet fellow students.',
        category: 'Academic',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        startTime: '10:00',
        endTime: '12:00',
        venue: 'Main Auditorium',
        organizer: '1', // Admin user
        maxParticipants: 200,
        registeredParticipants: [],
        isRegistrationRequired: true,
        isFree: true,
        status: 'published',
        isFeatured: true,
        isApproved: true,
        approvedBy: '1',
        approvedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        title: 'Tech Workshop: Introduction to Web Development',
        description: 'Learn the basics of HTML, CSS, and JavaScript in this hands-on workshop.',
        category: 'Technical',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        startTime: '14:00',
        endTime: '17:00',
        venue: 'Computer Lab 101',
        organizer: '1', // Admin user
        maxParticipants: 30,
        registeredParticipants: [],
        isRegistrationRequired: true,
        isFree: false,
        fee: 500,
        status: 'published',
        isFeatured: false,
        isApproved: true,
        approvedBy: '1',
        approvedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  // User methods
  findUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findUserById(id) {
    return this.users.find(user => user._id === id);
  }

  createUser(userData) {
    const newUser = {
      _id: Date.now().toString(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updateData) {
    const userIndex = this.users.findIndex(user => user._id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updateData, updatedAt: new Date() };
      return this.users[userIndex];
    }
    return null;
  }

  getAllUsers() {
    return this.users;
  }

  // Event methods
  getAllEvents() {
    return this.events;
  }

  getEventById(id) {
    return this.events.find(event => event._id === id);
  }

  createEvent(eventData) {
    const newEvent = {
      _id: Date.now().toString(),
      ...eventData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.events.push(newEvent);
    return newEvent;
  }

  updateEvent(id, updateData) {
    const eventIndex = this.events.findIndex(event => event._id === id);
    if (eventIndex !== -1) {
      this.events[eventIndex] = { ...this.events[eventIndex], ...updateData, updatedAt: new Date() };
      return this.events[eventIndex];
    }
    return null;
  }

  deleteEvent(id) {
    const eventIndex = this.events.findIndex(event => event._id === id);
    if (eventIndex !== -1) {
      this.events.splice(eventIndex, 1);
      return true;
    }
    return false;
  }

  approveEvent(id, approvedBy) {
    const event = this.getEventById(id);
    if (event) {
      event.isApproved = true;
      event.approvedBy = approvedBy;
      event.approvedAt = new Date();
      event.updatedAt = new Date();
      return event;
    }
    return null;
  }
}

module.exports = new InMemoryStore();
