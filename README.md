# My TypeScript Node.js Application

A clean, production-ready backend API built with Express, TypeScript, and MongoDB. Features JWT authentication, role-based access control, and a straightforward MVC architecture.

## Project Overview

This is a RESTful API server designed for simplicity and maintainability. It provides:

- **JWT-based authentication** - Secure token-based login and signup
- **Role & Permission system** - Fine-grained access control using roles and permissions
- **Request validation** - Type-safe validation with Zod
- **Structured logging** - Comprehensive logging with Winston
- **Database migration & seeding** - Easy setup and data management
- **Clean code practices** - Organized folder structure with separation of concerns

## Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) with bcrypt password hashing
- **Validation:** Zod for runtime type validation
- **Logging:** Winston for structured logging
- **Code Quality:** ESLint + Prettier
- **Development:** ts-node, nodemon

## Folder Structure

```
src/
├── app.ts                 # Express app configuration
├── index.ts              # Entry point
├── bootstrap/            # Server startup logic
├── config/               # Configuration files (env, database, logger, etc.)
├── core/                 # Core utilities
│   ├── constants/        # Application constants
│   ├── middlewares/      # Express middlewares (auth, error handling)
│   └── validation/       # Reusable validation schemas
├── db/                   # Database operations
│   ├── migration.ts      # Run migrations
│   ├── seed.ts          # Run seeders
│   └── seeders/         # Seeder files
├── modules/              # Feature modules (User, Role, Permission, etc.)
│   ├── user/            # User module
│   ├── role/            # Role module
│   ├── permission/      # Permission module
│   └── rolePermission/  # Role-Permission relationship
├── routes/               # API route definitions
├── types/                # TypeScript type definitions
├── utils/                # Helper utilities (JWT, response formatting)
└── views/                # Template files (if needed)
```

## Environment Setup

### Prerequisites

- Node.js 18+ (check with `node --version`)
- MongoDB running locally or a connection string available

### Installation

1. Clone the repository and navigate to the project:
   ```bash
   cd my-ts-node-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/my-ts-node-app
   
   # JWT
   JWT_SECRET=your-secret-key-here-change-in-production
   JWT_EXPIRATION=7d
   
   # Logging
   LOG_LEVEL=info
   ```

4. Run database migrations (if any):
   ```bash
   npm run db:migrate
   ```

5. Seed the database with initial data:
   ```bash
   npm run db:seed
   ```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Populate database with seed data |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format` | Format code with Prettier |

## Authentication Flow

### User Registration (Signup)

**Endpoint:** `POST /api/users/signup`

```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### User Login

**Endpoint:** `POST /api/users/login`

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Using the Token

Include the JWT token in the `Authorization` header for authenticated requests:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The token is verified by the `auth.middleware.ts` before accessing protected routes.

## Role & Permission Overview

### How It Works

The system uses three entities:

1. **Roles** - Define a job title or responsibility (e.g., Admin, User, Moderator)
2. **Permissions** - Define specific actions (e.g., create_user, delete_post, edit_comment)
3. **Role-Permission Mapping** - Links roles to permissions (e.g., Admin has all permissions)

### Example: Creating a Role with Permissions

A user assigned the "Admin" role has all permissions to create, read, update, and delete resources.

### Adding a New Permission

1. Create a permission record in the database
2. Assign it to relevant roles
3. Check permission in your controller using the permission ID

### Protecting Routes by Permission

Use middleware to check if a user has specific permissions:

```typescript
// In route definition
router.post('/resource', authMiddleware, permissionMiddleware('create_resource'), controller.create);
```

## API Testing

### Using Postman

1. **Import Environment Variables:**
   - Create a new environment in Postman
   - Add variables: `baseUrl`, `token`

2. **Test Signup:**
   - Method: `POST`
   - URL: `{{baseUrl}}/api/users/signup`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "Test@123",
       "name": "Test User"
     }
     ```

3. **Test Login:**
   - Method: `POST`
   - URL: `{{baseUrl}}/api/users/login`
   - Body (JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "Test@123"
     }
     ```
   - After response, update your `token` variable with the returned JWT

4. **Test Protected Route:**
   - Method: `GET`
   - URL: `{{baseUrl}}/api/users/profile`
   - Headers:
     ```
     Authorization: Bearer {{token}}
     Content-Type: application/json
     ```

## Development Guidelines

### Code Style

- Follow TypeScript strict mode rules
- Use const/let instead of var
- Write descriptive variable and function names
- Keep functions focused and small

### Creating a New Module

1. Create a folder in `src/modules/your-module`
2. Add these files:
   - `your-module.model.ts` - Mongoose schema and model
   - `your-module.controller.ts` - Request handlers
   - `your-module.service.ts` - Business logic (optional)
   - `your-module.route.ts` - Route definitions
   - `your-module.validation.ts` - Zod schemas

3. Register the route in `src/routes/index.ts`

### Error Handling

Use the error middleware in `src/core/middlewares/error.middleware.ts`. It catches all errors and returns a consistent response format.

### Validation

Use Zod for validating request bodies:

```typescript
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
});

// Validate in controller
const data = createUserSchema.parse(req.body);
```

### Logging

Use Winston logger from `src/config/logger.config.ts`:

```typescript
import { logger } from '@/config/logger.config';

logger.info('User created', { userId: user.id });
logger.error('Database error', error);
```

## Future Improvements

- [ ] Add unit and integration tests (Jest)
- [ ] Implement rate limiting middleware
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Set up CI/CD pipeline
- [ ] Add request/response caching
- [ ] Implement pagination for list endpoints
- [ ] Add email verification for signups
- [ ] Add password reset functionality
- [ ] Deploy to cloud (AWS, Railway, Heroku)
- [ ] Monitor performance with APM tools
