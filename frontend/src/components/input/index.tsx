import styles from './styles.module.css';

export interface InputProps {
    onChange: (value: string) => void;
    placeholder?: string;
}

export const Input = (props: InputProps) => {
    return (
        <input className={styles.input} onChange={(e) => {
            props.onChange(e.target.value)
        }} placeholder={props.placeholder} />
    );
};