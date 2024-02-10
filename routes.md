## Apply User to Job
- **Description:** Applies a user to a job.
- **Routes:**
  - `POST /job/:jobUid/user/:userUid`
  - `POST /user/:userUid/job/:jobUid`

## Withdraw User from Job
- **Description:** Withdraws a user from a job.
- **Routes:**
  - `DELETE /job/:jobUid/user/:userUid`
  - `DELETE /user/:userUid/job/:jobUid`

## Blog-Category Relations
- **Description:** Manages relationships between blogs and categories.
- **Routes:**
  - `POST /blog/:blogUid/category/:categoryUid`
  - `POST /category/:categoryUid/blog/:blogUid`
  - `DELETE /blog/:blogUid/category/:categoryUid`
  - `DELETE /category/:categoryUid/blog/:blogUid`

## Job Routes
- **Description:** CRUD operations for jobs.
- **Routes:**
  - `GET /jobs`
  - `GET /jobs/:uid`
  - `POST /jobs`
  - `PUT /jobs/:uid`
  - `DELETE /jobs/:uid`

## Blog Routes
- **Description:** CRUD operations for blogs.
- **Routes:**
  - `GET /blogs`
  - `GET /blogs/:uid`
  - `POST /blogs`
  - `PUT /blogs/:uid`
  - `DELETE /blogs/:uid`

## Category Routes
- **Description:** CRUD operations for categories.
- **Routes:**
  - `GET /categories`
  - `POST /categories`
  - `PUT /categories/:uid`
  - `DELETE /categories/:uid`

## User Routes
- **Description:** CRUD operations for users.
- **Routes:**
  - `GET /users`
  - `GET /users/:uid`
  - `POST /users`
  - `DELETE /users/:uid`

## Authentication Routes
- **Description:** Routes for user authentication.
- **Routes:**
  - `GET /auth/login`
  - `POST /auth/login`
  - `GET /auth/signup`
  - `POST /auth/signup`
  - `POST /auth/logout`

## Upload Images
- **Description:** Handles image uploads.
- **Routes:**
  - `POST /upload`

## Home Page
- **Description:** Renders the home page.
- **Routes:**
  - `GET /`
