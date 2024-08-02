"use client";
import "../styles/globals.css";
import donate from "../icons/Donate.svg";
import ear from "../icons/Ear.svg";
import Image from "next/image";
import useScreen from "../hooks/useScreen";
import Link from "next/link";

const Donate = () => {
  const screenSize = useScreen();
  return (
    <div className="thanks">
      <p className="thanksText">Подякувати за зручний сервіс можна тут</p>
      <Link href="https://send.monobank.ua/jar/4vMsJNqs5" target="_blank">
        <button className="btnDonate">
          <div className="donate">
            <p style={{ maxWidth: "180px" }}>Залишити на каву розробникам</p>
            <Image className="donateIcon" src={donate} alt="donate" />
          </div>
        </button>
      </Link>
      {screenSize !== "mobile" && (
        <Image
          src={ear}
          alt="ear"
          style={{
            position: "absolute",
            top: "1200px",
            right: "20px",
            zIndex: "-1",
          }}
        />
      )}
    </div>
  );
};

export default Donate;
