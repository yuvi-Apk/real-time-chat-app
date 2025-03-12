<!--! Chat App Backend -->
This is the backend for the Chat App, built with Node.js, Express, and MongoDB.

<!-- !Description -->
The backend handles user authentication, profile updates, and other API endpoints. It uses JWT for authentication and Cloudinary for image uploads.

<!-- !Tech Stack -->
Node.js
Express.js
MongoDB
Mongoose
JWT (JSON Web Tokens)
Cloudinary
bcrypt.js
dotenv
cookie-parser

<!-- !Folder & File Structure -->

backend/
├── src/
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── lib/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── utils.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── auth.route.js
│   └── index.js
├── .env
├── package.json
└── README.md

<!--! Explanation -->
controllers/: Contains the logic for handling requests and responses.

auth.controller.js: Handles user signup, login, logout, profile updates, and authentication checks.

lib/: Contains utility functions and configurations.
cloudinary.js: Configures Cloudinary for image uploads.

db.js: Connects to the MongoDB database.

utils.js: Contains utility functions like generating JWT tokens.

middleware/: Contains middleware functions.

auth.middleware.js: Middleware to protect routes and ensure the user is authenticated.

models/: Contains Mongoose models.

user.model.js: Defines the user schema and model.

routes/: Contains route definitions.

auth.route.js: Defines authentication-related routes.

index.js: The main entry point of the application. Sets up the Express server, middleware, and routes.

<!--! Data Flow -->

API Request: A request is made to an API endpoint.

Routes: The request is routed to the appropriate controller via the route definitions.

Controllers: The controller processes the request, interacts with the database, and sends a response.

Models: The controller uses Mongoose models to interact with the MongoDB database.

Middleware: Middleware functions are used to handle authentication and other pre-processing tasks.

Response: The controller sends a response back to the client.

<!--! Installation -->

1.Navigate to the backend directory:
cd backend

2.Install the dependencies:
npm install

3.Create a .env file in the backend directory and add the following environment variables:
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.rylrl.mongodb.net/
PORT=5001
JWT_SECRET=myscretkey
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

4.Start the development server:
npm run dev


<!-- ! API Endpoints -->
Auth Routes
POST /api/auth/signup - Register a new user
POST /api/auth/login - Login a user
POST /api/auth/logout - Logout a user
PUT /api/auth/profile-update - Update user profile picture (protected route)
GET /api/auth/check - Check if a user is authenticated (protected route)

<!--! Authentication -->
The backend uses JWT for authentication. When a user logs in or signs up, a JWT token is generated and set as a cookie in the response. Protected routes use middleware to verify the token and ensure the user is authenticated.

<!--! Environment Variables -->
MONGODB_URL: MongoDB connection string
PORT: Port number for the server
JWT_SECRET: Secret key for JWT
NODE_ENV: Node environment (development/production)
CLOUDINARY_CLOUD_NAME: Cloudinary cloud name for image uploads
CLOUDINARY_API_KEY: Cloudinary API key
CLOUDINARY_API_SECRET: Cloudinary API secret


<!--! How It Works -->

<!-- Request Processing -->

Request: A request is made to an API endpoint.
Route Handling: The request is routed to the appropriate controller.
Controller Logic: The controller processes the request, interacts with the database, and sends a response.
Middleware: Middleware functions handle tasks like authentication.
Response: The controller sends a response back to the client.

<!-- Role of Components -->
Controllers: Handle the main logic for processing requests and responses.
Models: Define the structure of the data and interact with the database.
Routes: Define the endpoints and map them to controller functions.
Middleware: Handle tasks like authentication and request pre-processing.

<!-- Background Tasks -->
Cloudinary Integration: Handles image uploads to Cloudinary.
JWT Authentication: Generates and verifies JWT tokens for user authentication.