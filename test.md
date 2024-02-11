# Blog Routes
- GET `/blogs`: Retrieve all blogs
- GET `/blogs/:uid`: Retrieve a specific blog by its UID
- POST `/blogs`: Create a new blog
    - Require login
    - Middleware: `upload.single("image")`
- PUT `/blogs/:uid`: Update a blog
    - Require login
- DELETE `/blogs/:uid`: Delete a blog
    - Require login

# Job Routes
- GET `/jobs`: Retrieve all jobs
- GET `/jobs/:uid`: Retrieve a specific job by its UID
- POST `/jobs`: Create a new job
    - Require login
- PUT `/jobs/:uid`: Update a job
    - Require login
- DELETE `/jobs/:uid`: Delete a job
    - Require login

# Job Application Routes
- GET `/job-applications`: Retrieve all job applications
    - Require login
- GET `/job-applications/:uid`: Retrieve a specific job application by its UID
    - Require login
- DELETE `/job-applications/:uid`: Delete a job application by its UID
    - Require login

# Job - Job Application Routes
- POST `/jobs/:jobUid/applications`: Create a job application for a specific job
    - Middleware: `upload.single("resume")`
- GET `/jobs/:jobUid/applications`: Retrieve all job applications for a specific job
    - Require login
