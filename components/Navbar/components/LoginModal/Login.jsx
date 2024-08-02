import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import {
  signInWithEmailAndCode,
  sendCodeToEmail,
  getAllService,
} from "@APIrest/userRest";
import { useUser } from "@hooks/useUser";
import Loader from "@components/Loader/Loader";

import styles from "./Login.module.css";

const Login = ({ onCloseLogin, setRegistrationModalOpen }) => {
  const [email, setEmail] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const { setUser, setServiceUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (isEmailSent && !isTimerExpired) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            setIsTimerExpired(true);
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      setTimeRemaining(180);
    }

    return () => clearInterval(timer);
  }, [isEmailSent, isTimerExpired]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Введіть коректну електронну адресу");
      return;
    }

    setIsLoading(true);
    setError("");

    const sendCodePromise = sendCodeToEmail(email)
      .then(() => setIsEmailSent(true))
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setError(
            "Користувач з такою адресою електронної пошти не зареєстрований."
          );
          localStorage.setItem("userEmail", email);
        } else {
          console.error(
            "Помилка під час надсилання коду на електронну пошту:",
            error
          );
          setError(
            "Виникла помилка під час надсилання коду на електронну пошту. Будь ласка, перевірте з'єднання або спробуйте ще раз."
          );
        }
      });

    const delayPromise = new Promise((resolve) => setTimeout(resolve, 4000));

    await Promise.all([sendCodePromise, delayPromise]);

    setIsLoading(false);
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signInWithEmailAndCode(email, secretCode);
      setUser(response.result);
      const userResponse = response.result;
      if (userResponse) {
        const getService = await getAllService(userResponse.token);
        const status = getService.status;
        if (status === 200) {
          const service = getService.data.result[0];
          setServiceUser(service);
        }
      }
      onCloseLogin();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setCodeError("Невірний код для входу");
        } else if (error.response.status === 435) {
          setCodeError("Невірний код");
          setError("Невірний код");
        } else if (error.response.status === 436) {
          setCodeError("Недійсний код");
          setError("Недійсний код");
        } else {
          console.error("Помилка під час логіну:", error);
          setError(
            "Виникла помилка під час логіну. Будь ласка, перевірте з'єднання або спробуйте ще раз."
          );
        }
      }
    }
  };

  const handleInputChange = (e) => {
    if (isEmailSent) {
      setCodeError("");
      setSecretCode(e.target.value);
    } else {
      setError("");
      setEmail(e.target.value);
    }
  };

  const handleRegistrationClick = () => {
    onCloseLogin();
    document.body.style.overflow = "hidden";
    setRegistrationModalOpen(true);
  };

  const handleResendEmail = () => {
    setIsTimerExpired(false);
    setIsEmailSent(false);
    setSecretCode("");
  };

  return ReactDOM.createPortal(
    <div className={`${styles.modalBackdrop} ${styles.root}`}>
      <div className={styles.modalContent}>
        <div style={{ display: "flex" }}>
          <div className={styles.flag}></div>
          <div className={styles.title}>
            Кабінет
            <br />
            Громадянина України
          </div>
        </div>
        <button className={styles.closeButton} onClick={onCloseLogin}>
          &times;
        </button>
        {!isLoading && <h2 className={styles.loginTitle}>Вхід</h2>}
        <p className={styles.loginText}>
          {isLoading ? (
            <Loader />
          ) : isEmailSent ? (
            <div className={styles.checkCode}>
              <p
                style={{
                  fontSize: "large",
                  fontWeight: "bolder",
                  marginBottom: "15px",
                }}
              >
                Введіть перевірочний код
              </p>
              <p className={styles.emailText}>
                який ми надіслали на Вашу електронну адресу {email}
              </p>
              <p style={{ fontSize: "10px", marginTop: "5px" }}>
                Якщо ви не побачили листа від нас — перевірте папку спам.
              </p>
            </div>
          ) : (
            <>
              Продовжуючи, ви погоджуєтесь з нашими
              <br />
              <a
                className={styles.loginLink}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Правилами та умовами,
              </a>
              <br />
              <a
                className={styles.loginLink}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Політикою конфіденційності
              </a>
            </>
          )}
        </p>
        {isLoading ? null : (
          <form
            onSubmit={
              isEmailSent ? handleVerificationSubmit : handleEmailSubmit
            }
          >
            {error && <div className={styles.error}>{error}</div>}
            {codeError && <div className={styles.error}>{codeError}</div>}
            <div className={styles.inputContainer}>
              <input
                type={isEmailSent ? "text" : "email"}
                placeholder={
                  isEmailSent ? "Код для входу" : "Електронна адреса"
                }
                value={isEmailSent ? secretCode : email}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
              <div className={styles.placeholderIcon}></div>
            </div>
            {isEmailSent && (
              <p className={styles.infoText}>
                {isTimerExpired && (
                  <span> Час вичерпано, спробуйте ще раз.</span>
                )}
                {!isTimerExpired && (
                  <span> Залишилося часу: {timeRemaining} секунд</span>
                )}
              </p>
            )}
            {isEmailSent && isTimerExpired && (
              <p className={styles.infoText}>
                Не отримали код?{" "}
                <a
                  className={styles.loginLink}
                  href="#"
                  onClick={handleResendEmail}
                >
                  Надіслати ще раз.
                </a>
              </p>
            )}
            {error ===
            "Користувач з такою адресою електронної пошти не зареєстрований." ? (
              <button
                type="button"
                className={styles.submitBtn}
                style={{ fontFamily: "e-Ukraine-Regular" }}
                onClick={handleRegistrationClick}
              >
                Зареєструйтесь
              </button>
            ) : (
              <button
                type="submit"
                className={styles.submitBtn}
                style={{ fontFamily: "e-Ukraine-Regular" }}
              >
                Надіслати
              </button>
            )}
          </form>
        )}
        {!isLoading && !isEmailSent && (
          <p className={styles.loginText}>
            Ви у нас вперше?{" "}
            <a
              href="#"
              className={styles.registerLink}
              onClick={handleRegistrationClick}
            >
              Зареєструйтесь
            </a>
          </p>
        )}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Login;
