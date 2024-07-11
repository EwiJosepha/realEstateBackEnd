# D&J Backend Collection

The D&J Backend Collection is a real estate web application built using NestJS, Prisma, and PostgreSQL. It provides a robust backend infrastructure for managing real estate listings, user authentication, and CRUD operations.

## Table of Contents

Features
Technology Stack
Getting Started
Prerequisites
Installation
Database Setup
API Documentation
Contributing

## Features

User Authentication (Login, Logout, Registration)
CRUD operations for real estate listings
Secure data storage using PostgreSQL
Integration with Prisma as the ORM (Object-Relational Mapping) layer
Modular and scalable architecture using NestJS

## Technology Stack

Technology Stack
Backend Framework: NestJS
ORM: Prisma
Database: PostgreSQL

## Getting Started

### Pre-requisites

Node.js (version 14 or higher)
PostgreSQL (version 12 or higher)

### Installation

```bash
git clone https://github.com/EwiJosepha/d-and-j-backend.git
```

cd into the repo and install dependencies

```bash
   npm install
```

### Database Setup

Create a new PostgreSQL database for the project.
Update the database connection details in the .env file:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/your db?schema=public"
JWT_SECRET=your_secret
```

```bash
npx prisma generate
```

### Start the development server:

```bash
npm run start:dev
```

## Api Documentation

_dev_base_url : <http://localhost:4000>_
_prod_base_url : https://dandj-collection.vercel.app.app/_

- Available routes

  - [Base Route](#base-route)

  - [Authentication](#authentication)

    - [Singup](#sign-up)
    - [login](#login)
    - [create-properties](#create-properties)
    - [Get Properties & Agent](#get-properties-&-agent)
    - [Query properties](#query-properties)
    - [Edit properties](#edit-properties)
    - [Delete property](#delete-property)

    - #### Sign Up

      ```bash
          Post("/signup")
          - # body: require
              {
                  "name": "test_username",
                  "email: "test _password",
                  "password": "test_password",
              }
          - # response: status - 200
              {
                  message: "Signup Successfull",
                  data: "<jwt_token>",
              }
      ```

- #### Login

  ``````bash
      Post("/login")
           - # body: require
               {
                   "email": "test_email",
                   "password": "test_password",
               }
           - # response: status - 200
               {
                   message: "login  Successfull",
                   data: "<jwt_token>",
               }
         `````

  ``````

- #### Delete Properties

````bash

            ```bash
                Delete("/<property_id>")
                - # header: required
                    {
                        "Authorization": "Bearer <jwt_token>"
                    }
                - # response: status - 200
                    {
                        "message": "property Deleted Successfully",
                        "data": null
                    }
            ```



````

- #### Properties

             Post("/properties")
             - # header: required
                 {
                     "Authorization": "Bearer <jwt_token>"
                 }
             - # body: required


      {
                  "agentId": "<id>","name":"String",
                  "type":"String",
                  "description":"String","rooms" :"String",
                  "bath" : "String",
                  "kitchen" :"String",
                  "livingRooms": "String",
                  "location":"String",
                  "price":"Int",
                  "areaInKm":"Int",
                  "rentOrSale":"String",
                  "shortDescription":"String",
                  "images":"String",
                  "agentId",
            } - # response: status - 200

#### Get Properties with Agent

```bash

    Get("/properties/agent/agentId")

```

#### Query Properties

```bash

Get("/properties?{query param here}")

```

#### Edit Properties

```bash

Post("/properties/{id of the property to edit}, {data:content of property to be edited}")

```
