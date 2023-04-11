import React from "react";
import styles from "./CardPreview.module.css";
import visa from "../../../images/visa.png";
import mastercard from "../../../images/mastercard.png";
import mir from "../../../images/mir.png";

import tinkoff from "../../../images/banks/tinkoff.png";
import sber from "../../../images/banks/sber.png";
import vtb from "../../../images/banks/vtb.png";
import gazprom from "../../../images/banks/gazprombank.png";
import sovkombank from "../../../images/banks/sovkombank.png";
import russianstandard from "../../../images/banks/russianstandard.png";
import uralsib from "../../../images/banks/uralsib.svg";
import alfa from "../../../images/banks/alfabank.png";

interface CardPreviewProps {
  number: string;
  bank: string;
  system: string;
  isValid: boolean;
}

const CardPreview = ({ number, bank, system, isValid }: CardPreviewProps) => {
  const cardColor =
    bank === "sberbank"
      ? "rgb(199 203 60), rgb(56 200 82)"
      : bank === "tinkoff"
      ? "#FFE52B, rgb(255 235 95)"
      : bank === "vtb"
      ? "rgb(38 200 255), rgb(46 66 212)"
      : bank === "gazprombank"
      ? "rgb(66 181 220), rgb(62 76 176)"
      : bank === "sovkombank"
      ? "rgb(73 93 245), #DB5054"
      : bank === "alfabank"
      ? "rgb(255 98 98), rgb(56 152 200)"
      : bank === "russianstandard"
      ? "rgb(192 210 225), rgb(150 134 134)"
      : bank === "uralsib"
      ? "rgb(255 67 150), rgb(112 78 209)"
      : "rgb(214 214 214), rgb(185 185 185)";

  const bankLogo =
    bank === "sberbank"
      ? sber
      : bank === "tinkoff"
      ? tinkoff
      : bank === "vtb"
      ? vtb
      : bank === "gazprombank"
      ? gazprom
      : bank === "sovkombank"
      ? sovkombank
      : bank === "alfabank"
      ? alfa
      : bank === "russianstandard"
      ? russianstandard
      : bank === "uralsib"
      ? uralsib
      : "";
  const systemImg =
    system === "visa"
      ? visa
      : system === "mastercard"
      ? mastercard
      : system === "mir"
      ? mir
      : "";
  return (
    <div
      className={isValid && number.length > 5 ? [styles.card, styles.active].join(" ") : styles.card}
      style={{ background: `linear-gradient(to right, ${cardColor})` }}
    >
      <div className={styles.logos_box}>
        <img src={bankLogo} alt="" className={styles.cardLogo} />
        <img src={systemImg} alt="" className={styles.systemLogo} />
      </div>

      <h1 className={styles.cardNumber}>
        {[
          number.slice(0, 4),
          number.slice(4, 8),
          number.slice(8, 12),
          number.slice(12, 16),
        ].join(" ")}
      </h1>
    </div>
  );
};

export default CardPreview;
