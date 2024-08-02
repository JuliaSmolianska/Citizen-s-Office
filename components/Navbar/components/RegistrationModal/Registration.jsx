import React, { useState, useEffect } from "react";
import { register, sendVerificationEmail } from "@APIrest/userRest";
import { useUser } from "@hooks/useUser";
import Loader from "@components/Loader/Loader";
import styles from "./Registration.module.css";

import ReactDOM from "react-dom";

const Registration = ({ onCloseRegistration, setLoginModalOpen }) => {
  const [formData, setFormData] = useState(() => {
    const email = localStorage.getItem("userEmail") || "";
    return {
      email: email,
      firstName: "",
      lastName: "",
      middleName: "",
    };
  });
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3 * 60);
  const [showEmailForm, setShowEmailForm] = useState(true);
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (isCodeSent && !isTimerExpired && !showEmailForm) {
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
      clearInterval(timer);
      setTimeRemaining(3 * 60);
    }
    return () => clearInterval(timer);
  }, [isCodeSent, isTimerExpired, showEmailForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name !== "email") {
      if (newValue.length === 1) {
        newValue = newValue.toUpperCase();
      } else {
        newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Введіть коректну електронну адресу");
      return;
    }

    setIsLoading(true);
    setError("");

    const delay = new Promise((resolve) => setTimeout(resolve, 4000));
    const sendEmailPromise = sendVerificationEmail(formData);

    try {
      await Promise.all([sendEmailPromise, delay]);
      setIsCodeSent(true);
      setShowEmailForm(false);
    } catch (error) {
      if (error.response && error.response.status === 432) {
        setError(
          "Користувач з такою адресою електронної пошти вже зареєстрований"
        );
      } else {
        console.error("Помилка під час перевірки користувача:", error);
        setError(
          "Виникла помилка під час перевірки користувача. Будь ласка, перевірте з'єднання або спробуйте ще раз."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName,
        email: formData.email,
        secretCode: secretCode,
      };

      const response = await register(userData, true);
      setUser(response);
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
        secretCode: "",
      });
      setError("");
      setIsCodeSent(false);
      setShowEmailForm(false);
      onCloseRegistration();
      localStorage.removeItem("userEmail");
    } catch (error) {
      console.error("Помилка під час реєстрації:", error);
      setError(
        "Виникла помилка під час реєстрації. Будь ласка, перевірте з'єднання або спробуйте ще раз."
      );
      setVerificationError(
        "Неправильний код підтвердження. Будь ласка, перевірте введений код і спробуйте ще раз."
      );
    }
  };

  const handleResendEmail = () => {
    setIsTimerExpired(false);
    setShowEmailForm(true);
  };

  const handleLoginClick = () => {
    onCloseRegistration();
    document.body.style.overflow = "hidden";
    setLoginModalOpen(true);
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
        <button className={styles.closeButton} onClick={onCloseRegistration}>
          &times;
        </button>
        {!isLoading && <h2 className={styles.registrationTitle}>Реєстрація</h2>}
        <p className={styles.registrationText}>
          {isLoading ? null : showEmailForm ? (
            <>
              Продовжуючи, ви погоджуєтесь з нашими
              <br />
              <a
                className={styles.registrationLink}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Правилами та умовами,
              </a>
              <br />
              <a
                className={styles.registrationLink}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Політикою конфіденційності
              </a>
            </>
          ) : (
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
                який ми надіслали на Вашу електронну адресу {formData.email}
              </p>
              <p style={{ fontSize: "10px", marginTop: "5px" }}>
                Якщо ви не побачили листа від нас — перевірте папку спам.
              </p>
            </div>
          )}
        </p>
        {showEmailForm ? (
          isLoading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className={styles.error}>{error}</div>}
              <div className={styles.inputContainer}>
                <input
                  placeholder="Електронна адреса"
                  className={styles.input}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <div className={styles.placeholderIcon}></div>
              </div>
              <div className={styles.inputContainer}>
                <input
                  placeholder="Прізвище"
                  className={styles.input}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <div className={styles.placeholderIcon}></div>
              </div>
              <div className={styles.inputContainer}>
                <input
                  placeholder="Ім'я"
                  className={styles.input}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <div className={styles.placeholderIcon}></div>
              </div>
              <div className={styles.inputContainer}>
                <input
                  placeholder="По-батькові"
                  className={styles.input}
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  required
                />
                <div className={styles.placeholderIcon}></div>
              </div>
              <button
                type="submit"
                className={styles.submitBtn}
                style={{ fontFamily: "e-Ukraine-Regular" }}
              >
                Відправити
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handleVerificationSubmit}>
            {verificationError && (
              <div className={styles.error}>{verificationError}</div>
            )}
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Код для підтвердження"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            <p className={styles.infoText}>
              {isTimerExpired && <span> Час вичерпано, спробуйте ще раз.</span>}
              {!isTimerExpired && (
                <span> Залишилося часу: {timeRemaining} секунд</span>
              )}
            </p>
            <button
              type="submit"
              className={styles.submitBtn}
              style={{ fontFamily: "e-Ukraine-Regular" }}
            >
              Підтвердити
            </button>
          </form>
        )}
        {!isLoading && (
          <p className={styles.registrationText}>
            Вже зареєстровані?{" "}
            <a href="#" className={styles.loginLink} onClick={handleLoginClick}>
              Увійти
            </a>
          </p>
        )}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Registration;
