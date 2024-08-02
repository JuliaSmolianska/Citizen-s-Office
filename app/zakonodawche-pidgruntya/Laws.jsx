import React from "react";
import {
  lawsPage,
  freePrivatLandDetails,
  partIncomeData,
  goToAbroad,
  cititzenUkr,
} from "@app/data/data";
import Link from "next/link";
import s from "./Laws.module.css";

const Laws = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Законодавче підґрунтя</h1>
      <div className={s.content}>
        <h2 className={s.heading}>{lawsPage.heading1}</h2>
        <p>{freePrivatLandDetails.details1}</p>
        <ul className={s.list}>
          {Array.isArray(lawsPage.list) &&
            lawsPage.list.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <p style={{ marginTop: "10px" }}>
          {freePrivatLandDetails.detailsBlue1}
        </p>
        <p style={{ marginTop: "10px" }}>
          {lawsPage.text1} {freePrivatLandDetails.details9}
        </p>
      </div>
      <div className={s.content}>
        <h2 className={s.heading}>{lawsPage.heading2}</h2>
        <p>{partIncomeData.details.details1}</p>
        <p style={{ marginTop: "10px" }}>{lawsPage.text2}</p>
        <p>{lawsPage.text3}</p>
        <p style={{ marginTop: "10px" }}>
          {partIncomeData.details.details3} {partIncomeData.details.details4}{" "}
          {partIncomeData.details.details5} {partIncomeData.details.details6}
        </p>
        <p style={{ marginTop: "10px" }}>
          {partIncomeData.details.detailsBlue1}
        </p>
        <p style={{ marginTop: "10px" }}>
          {partIncomeData.details.detailsBlue2}
        </p>
        <p style={{ marginTop: "10px" }}>
          {partIncomeData.details.detailsBlue3}
        </p>
        <p style={{ marginTop: "10px" }}>
          {partIncomeData.details.detailsBlue4}
        </p>
      </div>
      <div className={s.content}>
        <h2 className={s.heading}>{lawsPage.heading3}</h2>
        <p>{goToAbroad.details.details1}</p>
        <p style={{ marginTop: "10px" }}>{goToAbroad.details.details2}:</p>
        <p>{goToAbroad.details.details3}</p>
        <p style={{ marginTop: "10px" }}>{goToAbroad.details.details4}:</p>
        <ul className={s.list}>
          {Array.isArray(lawsPage.list2) &&
            lawsPage.list2.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <p style={{ marginTop: "10px" }}>{goToAbroad.details.details7}</p>
        <p style={{ marginTop: "10px" }}>
          {goToAbroad.details.detailsBlue1} {goToAbroad.details.detailsBlue2}
        </p>
        <p style={{ marginTop: "10px" }}>{lawsPage.text4}</p>
        <p>{lawsPage.text5}</p>
        <p>{goToAbroad.details.details9}</p>
        <p style={{ marginTop: "10px" }}>{goToAbroad.details.details10}:</p>
        <p>
          {goToAbroad.details.details11} {goToAbroad.details.details12}
        </p>
      </div>
      <div className={s.content}>
        <h2 className={s.heading}>{lawsPage.heading4}</h2>
        <p>{cititzenUkr.details.details1}</p>
        <p style={{ marginTop: "15px" }}>{cititzenUkr.details.details2}:</p>
        <ul className={s.list}>
          {Array.isArray(lawsPage.list3) &&
            lawsPage.list3.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <p style={{ marginTop: "10px" }}>{cititzenUkr.details.details5}:</p>
        <p>
          {cititzenUkr.details.details6} {cititzenUkr.details.details67}
        </p>
        <p style={{ marginTop: "10px" }}>
          {cititzenUkr.details.detailsBlue1} {cititzenUkr.details.detailsBlue2}
        </p>
        <p style={{ marginTop: "10px" }}>
          {cititzenUkr.details.details8} {cititzenUkr.details.details9}
        </p>
      </div>
      <button className={s.scrollButton}>
        <Link href="/">На головну</Link>
      </button>
    </div>
  );
};

export default Laws;
