# Express Backend
## Run locally
1. Install Java and make sure it is in your PATH
2. Change working directory to the `backend` folder
3. Run `npm install` to install all dependencies
4. Start Firestore emulator by running `firebase emulators:start --only firestore`
5. Open a new terminal, build and start the server by running `npm run build & npm start`
6. Repeat step 5 every time you make changes to the code

## Run in production
The backend of this project is hosted on GCP Cloud Run and uses Firestore as a database. It should be deployed automatically when a new commit is pushed to the main branch. The backend is available at https://skipli-coding-challenge-1-l3xwszm6ga-uc.a.run.app/
