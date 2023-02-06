# Express Backend

## Backend structure
- `src`: Contains all the source code
    - `data.ts`: Contains all the data access logic
    - `server.ts`: The entry point of the server
    - `stringee.ts`: Contains Stringee sms logic (not used)
    - `twilio.ts`: Contains Twilio sms logic
- `local.cmd`: A shortcut to run the server locally on Windows
- `tsconfig.json`: Specifies the TypeScript compiler options

Firestore related files:
- `.firebaserc`: Specifies the Firebase project to use
- `firestore.json`: Specifies the Firestore emulator configuration
- `firestore.indexes.json`: Specifies the indexes to create in Firestore
- `firestore.rules`: Specifies the Firestore security rules
> Note: all firestore related files are initialized by the Firebase CLI when you run `firebase init firestore`. Feel free to modify them to suit your needs. But keep the emulator configuration in `firestore.json` as it is.

Docker related files:
- `.dockerignore`: Specifies the files to ignore when building the Docker image
- `Dockerfile`: Specifies the Docker image build steps

Nodejs related files:
- `package.json`: Specifies the dependencies and scripts
- `package-lock.json`: Specifies the exact versions of the dependencies

## Run locally
1. Install Java and make sure it is in your PATH (required by Firestore emulator)
2. Intall Firebase CLI by running `npm install -g firebase-tools`
2. Change working directory to the `backend` folder
3. Change .firebaserc file to point to your Firebase project
3. Run `npm install` to install all dependencies
4. Start Firestore emulator by running `firebase emulators:start --only firestore`
5. Specify some [environment variables](#environment-variables) in your terminal
6. Open a new terminal, build and start the server by running `npm run build && npm run local`
7. Repeat step 6 every time you make changes to the code. You don't need to restart the Firestore emulator.

Note: There is a shortcut to do step 5 and 6 on Windows by running 'local.cmd' in the backend folder. You need to specify the environment variables in the script before running it.

## Run in production
The backend has a Dockerfile that can be used to build a Docker image. The image can then be deployed to a container registry and deployed to a container platform such as GCP Cloud Run.  

>   **Note**: Change .firebaserc file to point to your Firebase project.  
    Specify some [environment variables](#environment-variables) in the container.  
    If you are **not** using Cloud Run, you need to specify the credentials of a service account that has access to Firestore, follow the instructions [here](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments).

## Environment variables
- `TWILIO_ACCOUNT_SID`: The account SID of your Twilio account
- `TWILIO_AUTH_TOKEN`: The auth token of your Twilio account
- `TWILIO_MESSAGING_SID`: The Messaging service SID of your Twilio account  
- `TWILIO_SENDER_PHONE_NUMBER`: The phone number you purchased from Twilio
- `GCLOUD_PROJECT`: The project ID provided when you create Firestore database
