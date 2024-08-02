"use client";
import s from "./Footer.module.css";
import "../../styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import telegram from "../../icons/telegram.svg";
import tiktok from "../../icons/tiktok.svg";
import instagram from "../../icons/instagram.svg";
import youtube from "../../icons/youtube.svg";
import space_x from "../../icons/space_x.svg";
import { RxEnvelopeClosed } from "react-icons/rx";
import useScreen from "../../hooks/useScreen";
import { useState, useEffect, useRef } from "react";
import { footerData } from "@app/data/data";

const Footer = () => {
  const screenSize = useScreen();
  const [support, setSupport] = useState(false);
  const [copied, setCopied] = useState(false);
  const supportRef = useRef(null);
  const email = "24serpnya.com.ua@gmail.com";
  const dateYear = new Date().getFullYear();

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (supportRef.current && !supportRef.current.contains(event.target)) {
        setSupport(false);
      }
    };

    if (support) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [support]);

  const FooterMobile = () => {
    return (
      <div className={s.footerBox} style={{ display: "block" }}>
        <div style={{ margin: "10px 0 20px" }}>
          {!support ? (
            <button
              className="btnPrimary"
              style={{ width: "100%" }}
              onClick={() => setSupport(true)}
            >
              Потрібна допомога?
            </button>
          ) : (
            <div className={s.support} ref={supportRef}>
              <p>{footerData.support}</p>
              <div className={s.copy} onClick={handleCopy}>
                <RxEnvelopeClosed size={25} style={{ color: "#1888fa" }} />
                <b style={{ marginLeft: "5px" }}>{email}</b>
              </div>
              {copied && <div className={s.copied}>{footerData.copyLink}</div>}
            </div>
          )}
        </div>

        <div>
          <Link href="/mission" className={s.footerLink}>
            Місія проекту
          </Link>
          <p className={s.text2}>"Кабінет громадянина України"</p>
        </div>
        <div style={{ margin: "20px 0" }}>
          <Link href="/roads" className={s.footerLink}>
            Дорожня карта
          </Link>
        </div>
        <div style={{ margin: "20px 0 15px" }}>
          <Link href="/zakonodawche-pidgruntya" className={s.footerLink}>
            Законодавче підґрунтя
          </Link>
        </div>
        <div style={{ margin: "10px 0" }}>
          <p className={s.text1}>Комюніті проекту</p>
          <div className={s.iconsGroup}>
            <Link
              href="https://t.me/kabinet_gromadyanina_Ukraini"
              target="_blank"
            >
              <Image src={telegram} alt="telegram" />
            </Link>
            <Link
              href="https://tiktok.com/@kabinet_gromadyanina"
              target="_blank"
            >
              <Image src={tiktok} alt="TikTok" />
            </Link>
            <Link
              href="https://www.instagram.com/kabinet_gromadyanina"
              target="_blank"
            >
              <Image src={instagram} alt="Instagram" />
            </Link>
            <Link href="https://www.youtube.com/@24serpnya" target="_blank">
              <Image src={youtube} alt="Youtube" />
            </Link>
            <Link href="https://x.com/KabinetU60914" target="_blank">
              <Image src={space_x} alt="space_x" />
            </Link>
          </div>
        </div>
        <div className={s.text2} style={{ marginBottom: "15px" }}>
          <div>
            <Link href="/terms" className={s.footerLinkSecondary}>
              Правила та умови
            </Link>
          </div>
          <div>
            <Link href="/privacy" className={s.footerLinkSecondary}>
              Політика конфіденційності
            </Link>
          </div>
        </div>
        <div className={s.laws}>
          <p>24serpnya.com.ua &copy; {dateYear}. Всі права захищені</p>
        </div>
      </div>
    );
  };
  const FooterTablet = () => {
    return (
      <div className={s.footerBox} style={{ padding: "25px 10%" }}>
        <div style={{ width: "50%" }}>
          <div>
            <Link href="/mission" className={s.footerLink}>
              Місія проекту
            </Link>
            <p className={s.text2}>"Кабінет громадянина України"</p>
          </div>
          <div style={{ margin: "20px 0 25px" }}>
            <Link href="/roads" className={s.footerLink}>
              Дорожня карта
            </Link>
          </div>
          <div style={{ margin: "20px 0" }}>
            <Link href="/zakonodawche-pidgruntya" className={s.footerLink}>
              Законодавче підґрунтя
            </Link>
          </div>
          <div>
            <p className={s.text1}>Комюніті проекту</p>
            <div className={s.iconsGroup}>
              <Link
                href="https://t.me/kabinet_gromadyanina_Ukraini"
                target="_blank"
              >
                <Image src={telegram} alt="telegram" />
              </Link>
              <Link
                href="https://tiktok.com/@kabinet_gromadyanina"
                target="_blank"
              >
                <Image src={tiktok} alt="TikTok" />
              </Link>
              <Link
                href="https://www.instagram.com/kabinet_gromadyanina"
                target="_blank"
              >
                <Image src={instagram} alt="Instagram" />
              </Link>
              <Link href="https://www.youtube.com/@24serpnya" target="_blank">
                <Image src={youtube} alt="Youtube" />
              </Link>
              <Link href="https://x.com/KabinetU60914" target="_blank">
                <Image src={space_x} alt="space_x" />
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <div>
            {!support ? (
              <button
                className="btnPrimary"
                style={{ width: "100%" }}
                onClick={() => setSupport(true)}
              >
                Потрібна допомога?
              </button>
            ) : (
              <div className={s.support} ref={supportRef}>
                <p>{footerData.support}</p>
                <div className={s.copy} onClick={handleCopy}>
                  <RxEnvelopeClosed size={25} style={{ color: "#1888fa" }} />
                  <b style={{ marginLeft: "2px" }}>{email}</b>
                </div>
                {copied && (
                  <div className={s.copied}>{footerData.copyLink}</div>
                )}
              </div>
            )}
          </div>
          <div className={s.text2} style={{ marginBottom: "15px" }}>
            <div>
              <Link href="/terms" className={s.footerLinkSecondary}>
                Правила та умови
              </Link>
            </div>
            <div>
              <Link href="/privacy" className={s.footerLinkSecondary}>
                Політика конфіденційності
              </Link>
            </div>
          </div>
        </div>
        <p className={s.laws}>
          24serpnya.com.ua &copy; {dateYear}. Всі права захищені
        </p>
      </div>
    );
  };

  const FooterDesktop = () => {
    return (
      <div className={s.footerBox}>
        <div style={{ width: "33%" }}>
          <div>
            <Link href="/mission" className={s.footerLink}>
              Місія проекту
            </Link>
            <p className={s.text2}>"Кабінет громадянина України"</p>
          </div>
          <div style={{ margin: "20px 0" }}>
            <Link href="/roads" className={s.footerLink}>
              Дорожня карта
            </Link>
          </div>
          <div className={s.text2} style={{ marginBottom: "15px" }}>
            <div>
              <Link href="/terms" className={s.footerLinkSecondary}>
                Правила та умови
              </Link>
            </div>
            <div>
              <Link href="/privacy" className={s.footerLinkSecondary}>
                Політика конфіденційності
              </Link>
            </div>
          </div>
        </div>
        <div style={{ width: "33%" }}>
          <p className={s.text1}>Комюніті проекту</p>
          <div className={s.iconsGroup}>
            <Link
              href="https://t.me/kabinet_gromadyanina_Ukraini"
              target="_blank"
            >
              <Image src={telegram} alt="telegram" />
            </Link>
            <Link
              href="https://tiktok.com/@kabinet_gromadyanina"
              target="_blank"
            >
              <Image src={tiktok} alt="TikTok" />
            </Link>
            <Link
              href="https://www.instagram.com/kabinet_gromadyanina"
              target="_blank"
            >
              <Image src={instagram} alt="Instagram" />
            </Link>
            <Link href="https://www.youtube.com/@24serpnya" target="_blank">
              <Image src={youtube} alt="Youtube" />
            </Link>
            <Link href="https://x.com/KabinetU60914" target="_blank">
              <Image src={space_x} alt="space_x" />
            </Link>
          </div>
          <div style={{ margin: "20px 0" }}>
            <Link href="/zakonodawche-pidgruntya" className={s.footerLink}>
              Законодавче підґрунтя
            </Link>
          </div>
        </div>
        <div style={{ width: "33%" }}>
          {!support ? (
            <button
              className="btnPrimary"
              style={{ width: "100%" }}
              onClick={() => setSupport(true)}
            >
              Потрібна допомога?
            </button>
          ) : (
            <div className={s.support} ref={supportRef}>
              <p>{footerData.support}</p>
              <div className={s.copy} onClick={handleCopy}>
                <RxEnvelopeClosed size={25} style={{ color: "#1888fa" }} />
                <b style={{ marginLeft: "5px" }}>{email}</b>
              </div>
              {copied && <div className={s.copied}>{footerData.copyLink}</div>}
            </div>
          )}
        </div>
        <p className={s.laws}>
          24serpnya.com.ua &copy; {dateYear}. Всі права захищені
        </p>
      </div>
    );
  };

  return (
    <>
      {screenSize === "mobile" && <FooterMobile />}
      {screenSize === "tablet" && <FooterTablet />}
      {screenSize === "desktop" && <FooterDesktop />}
    </>
  );
};

export default Footer;
