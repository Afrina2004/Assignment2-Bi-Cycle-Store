...........Bicycle Store Management System 🚴‍♂️...........

Description:
The Bicycle Store Management System is a modern, feature-rich web application designed to manage the create,get, delete,update,Calculate Revenue from Orders, and orders of a bicycle store. Built with TypeScript, Express.js,and MongoDB to provide a scalable and reliable backend with full CRUD functionality.

Features
Product Management:

create,get, delete,update,Calculate Revenue from Orders, and order .
Validate product details (e.g., positive prices,positive quantity, validation error etc ).
Support for different types of bikes (Mountain, Road, City, etc.).
Inventory Management Logic:
When an order is placed, reduce the quantity in the product model.
If the inventory quantity goes to zero, set inStock to false.
Handle insufficient stock cases by returning an appropriate error message.
Data Integrity:

Prevent invalid data (e.g., negative prices or quantities sold exceeding stock).
Enforce consistency across product and order models.
RESTful API:

Comprehensive API endpoints for products and orders.
Adheres to REST standards for seamless integration.

Tech Stack:

Backend: TypeScript, Express.js.
Database: MongoDB with Mongoose for schema validation.
Validation: Strong input validation to prevent invalid data entries.
Setup Instructions
Prerequisites

installed:
npm 
Express
Dotenv
Typescript
Cors
Zod
Node.js 
MongoDB 
Steps to Set Up Locally

Clone the Repository:

Install Dependencies:
npm install

Set Up Environment Variables: Create a .env file in the root directory and include the following variables:

PORT=5000
NODE_ENV=development
DATABASE_URL=
BCRYPT_SALT_ROUNDS=

node dist/server.js
npm run start:dev
Access the Application: Open your browser and go to http://localhost:5000.

CRUD Operations:
Products:

POST /api/products: Create a Bicycle.
GET /api/products: Get All Bicycles.
GET /api/products/:ProductId:Get a Specific Bicycle.
PUT /api/products/:ProductId: Update a Bicycle by ID.
DELETE /api/products/:ProductId:  Delete a Bicycle by ID.

Orders:

POST /api/orders: Order a Bicycle.
Get /api/orders/revenue: Calculate Revenue from Orders (Aggregation)

Technologies Used
Backend: Node.js, Express.js
Language: TypeScript
Database: MongoDB with Mongoose
Validation: Mongoose schemas,zod,joi, TypeScript typings

Author
Developed by Afrina Khanam. Feel free to reach out for support or collaboration!
