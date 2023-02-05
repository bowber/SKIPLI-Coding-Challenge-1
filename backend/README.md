# Express Backend

## Run locally
1. Install Java and make sure it is in your PATH (required by Firestore emulator)
2. Intall Firebase CLI by running `npm install -g firebase-tools`
2. Change working directory to the `backend` folder
3. Run `npm install` to install all dependencies
4. Start Firestore emulator by running `firebase emulators:start --only firestore`
5. Specify some [environment variables](#environment-variables) in your terminal
6. Open a new terminal, build and start the server by running `npm run build && npm run local`
7. Repeat step 6 every time you make changes to the code. You don't need to restart the Firestore emulator.

Note: There is a shortcut to do step 5 and 6 on Windows by running 'local.cmd' in the backend folder. You need to specify the environment variables in the script before running it.

## Run in production
The backend has a Dockerfile that can be used to build a Docker image. The image can then be deployed to a container registry and deployed to a container platform such as GCP Cloud Run. 
And you need to specify some [environment variables](#environment-variables) in the container.  
*Note* that if you are **not** using Cloud Run, you need to specify the credentials of a service account that has access to Firestore, follow the instructions [here](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments).

## Environment variables
- `TWILIO_ACCOUNT_SID`: The account SID of your Twilio account
- `TWILIO_AUTH_TOKEN`: The auth token of your Twilio account
- `TWILIO_MESSAGING_SID`: The Messaging service SID of your Twilio account  
- `TWILIO_SENDER_PHONE_NUMBER`: The phone number you purchased from Twilio
- `GCLOUD_PROJECT`: The project ID provided when you create Firestore database
