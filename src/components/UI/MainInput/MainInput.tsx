import React, { KeyboardEventHandler, Ref, RefObject, useState } from "react";
import styles from "./MainInput.module.css";
import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";

interface InputProps {
  type: string;
  placeholder: string;
  onChangeFunc: Function;
  width: string;
  value: string;
  maxLenght: number;
  onKeyPress: KeyboardEventHandler<HTMLInputElement> | undefined;
}

const MainInput = ({
  type,
  placeholder,
  onChangeFunc,
  width,
  value,
  maxLenght,
  onKeyPress
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const mask =
    maxLenght === 19
      ? createDefaultMaskGenerator("9999 9999 9999 9999")
      : maxLenght === 5
      ? createDefaultMaskGenerator("99/99")
      : maxLenght === 6
      ? createDefaultMaskGenerator("999999")
      : createDefaultMaskGenerator("999")

  return (
    <div
      className={[
        isFocus ? [styles.inputBox, styles.active].join(" ") : styles.inputBox,
        isFinished ? styles.added : "",
      ].join(" ")}
      style={{ width }}
    >
      <MaskedInput
        maskGenerator={mask}
        type={type}
        value={value}
        onKeyPress={onKeyPress}
        onChange={(value) => onChangeFunc(value)}
        className={
          isFocus ? [styles.input, styles.active].join(" ") : styles.input
        }
        onFocus={() => setIsFocus(true)}
        onBlur={(e) => {
          setIsFocus(false);
          if (e.target.value.length !== 0) {
            setIsFinished(true);
          }
        }}
        id={placeholder}
        maxLength={maxLenght}
      />
      <label htmlFor={placeholder} className={styles.label}>
        {placeholder}
      </label>
    </div>
  );
};

export default MainInput;
