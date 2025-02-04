# Backend - PERN Stack - Product Manager

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)  
- [API Docs SWAGGER](#api-docs-swagger)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This is the backend service for a full-stack PERN (PostgreSQL, Express, React, Node.js) application built with TypeScript. The service provides a robust RESTful API with database integration using Sequelize ORM, authentication, and comprehensive documentation.

## Features
- RESTful API architecture
- PostgreSQL database integration with Sequelize ORM
- User authentication and authorization (JWT)
- TypeScript for enhanced type safety and developer experience
- Database migrations and seeders
- Input validation and sanitization
- Error handling middleware
- API documentation with Swagger
- Comprehensive testing setup
- Security features implementation
- CORS configuration
- Environment-based configurations

## Technologies
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Sequelize ORM
- Axios
- JWT for authentication
- Bcrypt for password hashing
- Jest & Supertest for testing
- Swagger UI Express for API documentation
- Winston for logging
- ESLint & Prettier
- Cors
- Helmet for security

## Installation

1. Clone the repository:
```bash
git clone https://github.com/fer8614/Product-Manager
```

2. Navigate to server directory:
```bash
cd fullstack_node_react_typescript/server
```

3. Install dependencies:
```bash
npm install
```

4. Create `.env` file in server root directory:
```env
DATABASE_URL=your_database_name
FROONTEND_URL=your_frontend_user
```

5. Configure database:
```bash
# Run migrations
npm run migrate

# Run seeders (if any)
npm run seed
```

## Usage

Development mode:
```bash
npm run dev
```

Build project:
```bash
npm run build
```

Database commands:
```bash
# Create migration
npm run migrate:create name_of_migration

# Undo last migration
npm run migrate:undo

# Create seeder
npm run seed:create name_of_seeder
```

## API Docs SWAGGER

Access Swagger documentation at:
```
http://localhost:4000/api-docs
```

The documentation includes:
- Detailed endpoint descriptions
- Request/Response schemas
- Authentication requirements
- Example requests
- Error responses

## API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login - Login user
POST /api/auth/logout - Logout user
```

### Users
```
GET /api/users - Get all users
GET /api/users/:id - Get user by ID
PUT /api/users/:id - Update user
DELETE /api/users/:id - Delete user
```

### Products (Example Resource)
```
GET /api/products - Get all products
POST /api/products - Create product
GET /api/products/:id - Get product by ID
PUT /api/products/:id - Update product
DELETE /api/products/:id - Delete product
```

Protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

## Testing

Run unit tests:
```bash
npm run test
```

Run integration tests:
```bash
npm run test:integration
```

Generate coverage report:
```bash
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Contribution Guidelines:
- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Follow existing code style
- Use meaningful commit messages

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---
