import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const app = initializeApp({ projectId: 'skipli-coding-challenge-1' });
const USER_COLLECTION = 'users';
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
            accessCodeExpiration: Date.now() + 1000 * 60 * 5
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