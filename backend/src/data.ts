import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';


const USER_COLLECTION = 'users';
const ACCESS_CODE_EXPIRATION = 1000 * 60 * 5; // 5 minutes

const app = initializeApp({ projectId: process.env.GCLOUD_PROJECT });
const db = getFirestore(app);


interface User {
    phoneNumber?: string;
    accessCode?: number;
    accessCodeExpiration?: number;
}


export const CreateNewAccessCode = async (phoneNumber) => {
    return await db.runTransaction(async (transaction) => {
        const usersRef = db.collection(USER_COLLECTION);

        const userQuery = await transaction.get(usersRef.where('phoneNumber', '==', phoneNumber).limit(1));
        if (userQuery.empty) return null;

        const user = userQuery.docs[0];
        if (user.get(('accessCodeExpiration') ?? 0) > Date.now()) {
            const oldAccessCode = user.get('accessCode') as number;
            if (oldAccessCode) return oldAccessCode;
        }

        const accessCode = Math.min(Math.max(100000, Math.floor(Math.random() * 1000000)), 999999);
        console.log(accessCode)

        transaction.update(user.ref, {
            accessCode,
            accessCodeExpiration: Date.now() + ACCESS_CODE_EXPIRATION
        });
        return accessCode;
    });
};


export const ValidateAccessCode = async (phoneNumber: string, accessCode: string) => {
    const usersRef = db.collection(USER_COLLECTION);
    return await db.runTransaction(async (transaction) => {
        const userQuery = await transaction.get(
            usersRef.where('phoneNumber', '==', phoneNumber)
                .where('accessCode', '==', accessCode)
                .where('accessCode', '!=', null)
                .limit(1)
        );

        if (userQuery.empty) return false;

        const user = userQuery.docs[0];
        if ((user.get('accessCodeExpiration') ?? 0) < Date.now()) return false;
        transaction.update(user.ref, {
            accessCode: null,
            accessCodeExpiration: null
        });
        return true;
    });
}

