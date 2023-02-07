# React Frontend

## Frontend Structure
- `public`: Contains the HTML template and static assets
- `src`: All the React code
- `.env.production`: Environment variables for production build
- `.env.development`: Environment variables for development build 

## Local Development
1. Install dependencies: `npm install`
2. Start the development server: `npm start`
3. Start the backend server (see [backend/README.md](../backend/README.md))

## Deployment
1. Configure environment variables in `.env.production` file
2. Build the frontend: `npm run build`
3. Everything in the `build` folder can be deployed to a static hosting service such as Github Pages or Firebase Hosting.