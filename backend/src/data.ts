import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import twilio from 'twilio';

const app = initializeApp({ projectId: 'skipli-coding-challenge-1' });
const USER_COLLECTION = 'users';
const ACCESS_CODE_EXPIRATION = 1000 * 60 * 5; // 5 minutes

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID as string;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN as string;
const TWILIO_VERIFY_SID = process.env.TWILIO_VERIFY_SID as string

interface User {
    phoneNumber?: string;
    accessCode?: number;
    accessCodeExpiration?: number;
}
export const CreateNewAccessCode = async (phoneNumber) => {
    const accessCode = Math.min(Math.max(100000, Math.floor(Math.random() * 1000000)), 999999);

    const db = getFirestore(app);
    const usersRef = db.collection(USER_COLLECTION)
    return await db.runTransaction(async (transaction) => {
        const userQuery = await transaction.get(usersRef.where('phoneNumber', '==', phoneNumber).limit(1));

        if (userQuery.empty) return null;

        const user = userQuery.docs[0] as User & { ref: FirebaseFirestore.DocumentReference };
        if (user.accessCodeExpiration ?? 0 > Date.now()) return accessCode;

        transaction.update(user.ref, {
            accessCode,
            accessCodeExpiration: Date.now() + ACCESS_CODE_EXPIRATION
        });
        return accessCode;
    });
};


export const ValidateAccessCode = async (phoneNumber: string, accessCode: string) => {
    const db = getFirestore(app);
    const usersRef = db.collection(USER_COLLECTION);
    return await db.runTransaction(async (transaction) => {
        const userQuery = await transaction.get(
            usersRef.where('phoneNumber', '==', phoneNumber)
                .where('accessCode', '==', accessCode)
                .where('accessCode', '!=', null)
                .where('accessCodeExpiration', '>', Date.now())
                .limit(1)
        );
        if (userQuery.empty) return false;

        const user = userQuery.docs[0] as User & { ref: FirebaseFirestore.DocumentReference };

        transaction.update(user.ref, {
            accessCode: null,
            accessCodeExpiration: null
        });
        return true;
    });
}

const sendTwilioOTP = async (phoneNumber, accessCode) => {
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    return await client.verify.v2
        .services(TWILIO_VERIFY_SID)
        .verifications
        .create({
            to: phoneNumber,
            channel: 'sms'
        })
}

const validateTwilioOTP = async (phoneNumber, code) => {
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    return await client.verify.v2
        .services(TWILIO_VERIFY_SID)
        .verificationChecks
        .create({
            to: phoneNumber,
            code: code
        })
}