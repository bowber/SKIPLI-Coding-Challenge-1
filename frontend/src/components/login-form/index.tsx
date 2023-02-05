import styles from './styles.module.css';
import { useState } from 'react';

export interface FormProps {
    onSendAccessCode: (phoneNumber: string) => void;
    onSignIn: (phoneNumber: string, accessCode: string) => void;
}

export const Form = (props: FormProps) => {
    const [phoneNumber, changePhoneNumber] = useState("")
    const [accessCode, changeAccessCode] = useState("")
    return (
        <div>
            <div className={styles.row}>
                <div>Phone Number: </div>
                <input onChange={(e) => changePhoneNumber(e.target.value)} type="tel" placeholder="+84123456789" />
                <button onClick={() => props.onSendAccessCode(phoneNumber)}>Send Access Code</button>
            </div>
            <div className={styles.row}>
                <div>Access Code: </div>
                <input onChange={(e) => changeAccessCode(e.target.value)}  placeholder="" />
                <button onClick={() => props.onSignIn(phoneNumber, accessCode)}>Sign In</button>
            </div>
        </div>
    );
};