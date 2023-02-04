# Express Backend
## How to run locally
Without Docker:
```
cd backend
npm install
npm start
```

With Docker:
```
cd backend
docker build -t backend .
docker run -p 80:80 backend
```

Now you can access the server at http://localhost
## How to run in production
Use pre-configured Dockerfile to build and run the image similar to the local setup but run it on a hosting service of your choice.
