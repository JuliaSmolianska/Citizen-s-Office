"use client";

import React, { useState, useEffect } from "react";
import { useUser, initialServiceUser } from "@hooks/useUser";
import { logOut } from "@APIrest/userRest";
import useScreen from "../../hooks/useScreen";
import LoginModal from "./components/LoginModal/Login";
import RegistrationModal from "./components/RegistrationModal/Registration";
import Image from "next/image";
import { moveLine } from "@app/data/data";

import s from "./Navbar.module.css";
import "../../styles/globals.css";
import icon from "../../public/icon-192x192.png";
import Link from "next/link";

const Navbar = () => {
  const screenSize = useScreen();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const { user, setUser, setServiceUser } = useUser();

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
    }
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleRegistrationClick = () => {
    setRegistrationModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModalLogin = () => {
    setLoginModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleCloseModalRegistration = () => {
    setRegistrationModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleLogout = async () => {
    try {
      await logOut(user.token);
      setUser(null);
      setServiceUser(initialServiceUser);
      localStorage.removeItem("userCurrent");
    } catch (error) {
      console.error("Помилка під час логауту!!!", error);
    }
  };

  return (
    <>
      <div className={`${s.navbarBox} ${s.root}`}>
        <div className={s.navbar_wrapper}>
          <Link href="/">
            <h1 style={{ display: "flex" }}>
              <div className={s.flag}></div>
              <div className={s.title}>
                Кабінет
                <br />
                Громадянина України
              </div>
            </h1>
          </Link>
          <button className={s.buttonPWA} onClick={handleInstallClick}>
            <Image src={icon} width={28} className={s.imagePWA}></Image>
            <p>Закріпити на робочому столі</p>
          </button>
          <div>
            {user ? (
              <button
                className="btnPrimary"
                style={{ fontFamily: "e-Ukraine-Regular" }}
                onClick={handleLogout}
              >
                Вихід
              </button>
            ) : (
              <>
                {screenSize !== "mobile" && (
                  <button
                    className="btnSecondary"
                    style={{ fontFamily: "e-Ukraine-Regular" }}
                    onClick={handleRegistrationClick}
                  >
                    Реєстрація
                  </button>
                )}
                <button
                  className="btnPrimary"
                  style={{ fontFamily: "e-Ukraine-Regular" }}
                  onClick={handleLoginClick}
                >
                  Вхід
                </button>
              </>
            )}
          </div>
          {isRegistrationModalOpen && (
            <RegistrationModal
              onCloseRegistration={handleCloseModalRegistration}
              setLoginModalOpen={setLoginModalOpen}
            />
          )}
          {isLoginModalOpen && (
            <LoginModal
              setRegistrationModalOpen={setRegistrationModalOpen}
              onCloseLogin={handleCloseModalLogin}
            />
          )}
        </div>
        <div className={s.marquee}>
          <div className={s.marquee_wrapper}>
            <h1 className={s.marquee_text}>{moveLine[0].text}</h1>
            <h1 className={s.marquee_text}>{moveLine[0].text}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
