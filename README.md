# Bennett University Event Management System

A full-stack web application for managing university events, built with React, Node.js, and MongoDB.

## Features

### For Students
- View all published events
- Filter events by category, date, and other criteria
- Register for events (if registration is required)
- View event details and schedules
- Manage personal profile

### For Administrators
- Create, edit, and delete events
- Approve pending events
- Manage user accounts
- View event and user statistics
- Set event categories, venues, and schedules

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- React Hook Form
- Axios
- Lucide React (icons)
- React Hot Toast (notifications)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- CORS for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bennett-university-events
```

2. Install dependencies for all packages:
```bash
npm run install-all
```

3. Set up environment variables:
   - Copy `server/config.env` and update the values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bennett_events
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```

4. Start MongoDB:
```bash
mongod
```

5. Start the development servers:
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## Usage

### First Time Setup

1. Start the application and navigate to `http://localhost:3000`
2. Register a new account (this will be a student account by default)
3. To create an admin account, you can either:
   - Modify the user role directly in the database
   - Use the MongoDB shell to update a user's role to 'admin'

### Creating an Admin Account

Using MongoDB shell:
```javascript
use bennett_events
db.users.updateOne(
  { email: "admin@bennett.edu" },
  { $set: { role: "admin" } }
)
```

### Default Admin Account

You can also create a default admin account by running this script in the MongoDB shell:
```javascript
use bennett_events
db.users.insertOne({
  name: "Admin User",
  email: "admin@bennett.edu",
  password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
  role: "admin",
  department: "Administration",
  year: "1st Year",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Events
- `GET /api/events` - Get all published events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)
- `POST /api/events/:id/approve` - Approve event (Admin only)
- `GET /api/events/admin/all` - Get all events for admin

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `POST /api/users/:id/toggle-status` - Toggle user status (Admin only)
- `GET /api/users/stats/overview` - Get user statistics (Admin only)

## Database Models

### User
- name, email, password
- role (admin/student)
- studentId, department, year
- isActive, timestamps

### Event
- title, description, category
- date, startTime, endTime, venue
- organizer, maxParticipants
- registrationDeadline, isRegistrationRequired
- isFree, fee, image, tags
- status (draft/published/cancelled)
- isFeatured, isApproved
- approvedBy, approvedAt, timestamps

## Project Structure

```
bennett-university-events/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── ...
├── package.json           # Root package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@bennett.edu or create an issue in the repository.