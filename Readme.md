# Wander Lust

A full-stack web application for discovering and sharing travel destinations and accommodations. Users can browse listings, create their own listings, and leave reviews for places they've visited.

## Features

- **User Authentication**: Secure signup and login system using Passport.js
- **Listings Management**: Create, read, update, and delete travel/accommodation listings
- **Reviews System**: Users can leave reviews and ratings for listings
- **Image Upload**: Cloudinary integration for storing listing images
- **Session Management**: Persistent user sessions with flash messages
- **Responsive Design**: Modern UI with EJS templating

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Local Strategy
- **Templating**: EJS (Embedded JavaScript)
- **File Upload**: Multer with Cloudinary storage
- **Session**: express-session with connect-flash
- **Validation**: Joi for data validation

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Wander Lust"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Cloudinary credentials (if using cloud storage):
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start MongoDB:
   - Make sure MongoDB is running on `mongodb://127.0.0.1:27017`

5. Initialize the database (optional):
   - Run the initialization script to seed sample data:
   ```bash
   node init/index.js
   ```

6. Start the development server:
```bash
node app.js
```

The server will start on `http://localhost:8080`

## Project Structure

```
Wander Lust/
├── app.js                 # Main application entry point
├── cloudConfig.js         # Cloudinary configuration
├── middleware.js          # Custom middleware functions
├── schema.js              # Joi validation schemas
├── controllers/           # Route controllers
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/                # Mongoose models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/                # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/                 # EJS templates
│   ├── listings/
│   ├── users/
│   ├── includes/
│   └── layouts/
├── public/                # Static assets
│   ├── css/
│   └── js/
├── utils/                 # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
└── init/                  # Database initialization
    ├── index.js
    └── data.js
```

## Usage

### Creating a Listing
1. Sign up or log in to your account
2. Navigate to "New Listing"
3. Fill in the listing details (title, description, price, location, country)
4. Upload an image
5. Submit the form

### Leaving a Review
1. Browse listings and select one to view details
2. Scroll to the reviews section
3. Add your rating and comment
4. Submit your review

## API Routes

- `GET /listings` - View all listings
- `GET /listings/new` - Create new listing form
- `POST /listings` - Create a new listing
- `GET /listings/:id` - View a specific listing
- `GET /listings/:id/edit` - Edit listing form
- `PUT /listings/:id` - Update a listing
- `DELETE /listings/:id` - Delete a listing
- `POST /listings/:id/reviews` - Add a review
- `DELETE /listings/:id/reviews/:reviewId` - Delete a review
- `GET /signup` - User registration form
- `POST /signup` - Register a new user
- `GET /login` - User login form
- `POST /login` - Authenticate user
- `POST /logout` - Logout user

## Database Schema

### Listing
- title (String, required)
- description (String, required)
- image (Object with filename and url)
- price (Number, required)
- location (String, required)
- country (String, required)
- reviews (Array of Review ObjectIds)
- owner (User ObjectId reference)

### Review
- rating (Number)
- comment (String)
- author (User ObjectId reference)

### User
- username (String, unique)
- email (String)
- password (hashed using passport-local-mongoose)

## Development

The application uses:
- **nodemon** for automatic server restarts during development
- **method-override** for RESTful routes (PUT/DELETE)
- **ejs-mate** for EJS layout support

## Security Features

- Password hashing using passport-local-mongoose
- Session-based authentication
- HTTP-only cookies
- Input validation with Joi
- CSRF protection through session management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Khubaib Ashraf

## Acknowledgments

- Built with Express.js and MongoDB
- UI components and styling
- Cloudinary for image hosting services

