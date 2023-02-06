import styles from './styles.module.css';
import { useState } from 'react';
import { Input } from '../input';
import { Button } from '../button';
export interface FormProps {
    onSendAccessCode: (phoneNumber: string) => void;
    onSignIn: (phoneNumber: string, accessCode: string) => void;
}

export const Form = (props: FormProps) => {
    const [phoneNumber, changePhoneNumber] = useState("")
    const [accessCode, changeAccessCode] = useState("")
    return (
        <div className={styles.container}>
            <div className={styles.title}>Simple Login App</div>
            <div className={styles.label}>Phone Number: </div>
            <div className={styles.row}>
                <Input onChange={(value) => changePhoneNumber(value)} placeholder="+84909219251" />
                <Button
                    onClick={() => props.onSendAccessCode(phoneNumber)}
                    text="Send Access Code"
                    type="secondary"
                />
            </div>
            <div className={styles.label}>Access Code: </div>

            <div className={styles.row}>
                <Input onChange={(value) => changeAccessCode(value)} />
                <Button
                    onClick={() => props.onSignIn(phoneNumber, accessCode)}
                    text="Sign In"
                    type="primary"
                />
            </div>
        </div>
    );
};