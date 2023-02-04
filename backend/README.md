# Express Backend
## Run locally
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
## Run in production
This project is hosted on GCP Cloud Run and uses Firestore as a database.
