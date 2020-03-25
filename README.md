# CatBreedsApp
This is a demo full stack application developed with Mongo, Express, React and Nodejs


## Handling Mongo URI and SECRET
Please create a file config/default.json which will hold the mongoURI and JWT secret. Format:

```json
{
    "mongoURI": "PUT YOUR MONGO URI",
    "jwtSecret": "SECRECT TO ENCRYPT PASSWORDS"
}

```

## Route Information
In this application following backend routes are implemented and all routes are private except Authenticate user API:


Auth Routes:
```text
    GET:    api/auth/user     (Get user data)
    POST:   api/auth          (Authenticate user)               Access: PUBLIC
```

User Routes:
```text
    POST:   api/users         (Register a new user)
```

Breed Routes:
```text
    GET:    api/breeds/search (Search breed with name)
    GET:    api/breeds        (Get all Breeds)
    GET:    api/breeds/:id    (Get specific Breed for an id)
    POST:   api/breeds        (Create a Cat Breed)
    DELETE: api/breeds/:id    (Delete a Cat Breed)
```

## Installation
After clonning the repository, following command will run both backend and frontend applications (In development mode):

```bash
npm run dev
```
