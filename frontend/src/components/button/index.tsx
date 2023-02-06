import styles from './styles.module.css';

export interface ButtonProps {
    onClick: () => void;
    text: string;
    type: "primary" | "secondary";
}

export const Button = (props: ButtonProps) => {
    return (
        <div
            className={styles.container + " " + styles[props.type]}
            onClick={props.onClick}
        >
            <span className={styles.text}>{props.text}</span>
        </div>
    );
};