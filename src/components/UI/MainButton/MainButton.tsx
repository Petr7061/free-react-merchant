import React from "react";
import styles from "./MainButton.module.css";

interface ButtonProps {
  text: string;
  callback: Function;
}

const MainButton = ({ text, callback }: ButtonProps) => {
  return (
    <div className={styles.btn} onClick={() => callback()}>
      <p className={styles.buttonTitle}>{text}</p>
    </div>
  );
};

export default MainButton;
