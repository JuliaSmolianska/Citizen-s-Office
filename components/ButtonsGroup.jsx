"use client";
import "../styles/globals.css";
import useScreen from "../hooks/useScreen";
import marked from "../icons/marked.svg";
import Image from "next/image";
import ChooseLandForPrivate from "./FreePrivateLand/ChooseLandForPrivate";
import Modal from "@components/Modal/Modal";
import { useState, useEffect } from "react";
import Details from "./FreePrivateLand/Details";
import { useUser } from "@hooks/useUser";
import RegistrationModal from "./Navbar/components/RegistrationModal/Registration";
import LoginModal from "./Navbar/components/LoginModal/Login";

const ButtonsGroup = ({
  handleFixed,
  handleFixedCancel,
  isFixed,
  fetchName,
  categoryName,
  details,
  amount,
  scrollPosition,
  setScrollPosition,
}) => {
  const screenSize = useScreen();
  const [showChooseModal, setShowChooseModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const toggleChooseModal = () => {
    setShowChooseModal(!showChooseModal);
  };
  const toggleDetailsModal = () => {
    setShowDetailsModal(!showDetailsModal);
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

  return screenSize !== "mobile" ? (
    <div className="btnGroup">
      <div>
        {isFixed ? (
          <div className="blockFixed">
            <p style={{ padding: "0 10px 10px", backgroundColor: "#04c65d" }}>
              <Image src={marked} alt="marked" style={{ margin: "0 auto" }} />
              Зафіксовано
            </p>
            <button
              className="btnFixed"
              onClick={() => handleFixedCancel({ fetchName, categoryName })}
            >
              Скасувати <br />
              заявку
            </button>
          </div>
        ) : (
          <button
            className="btnPrimary"
            style={{
              margin: "0",
              border: "1px solid #1888fa",
            }}
            onClick={
              user
                ? fetchName
                  ? toggleChooseModal
                  : handleFixed
                : handleLoginClick
            }
          >
            Зафіксувати
          </button>
        )}
      </div>
      <div>
        <button
          className="btnSecondary"
          style={{ margin: "0" }}
          onClick={toggleDetailsModal}
        >
          Детальніше
        </button>
      </div>
      <p className="marked">
        Зафіксовано, всього
        <br />
        <b style={{ fontSize: "24px" }}>{amount ? amount : 0}</b>
      </p>
      <Modal
        show={showChooseModal}
        onClose={toggleChooseModal}
        style={{ width: "650px" }}
      >
        <ChooseLandForPrivate
          setShowChooseModal={setShowChooseModal}
          fetchName={fetchName}
          categoryName={categoryName}
          scrollPosition={scrollPosition}
          setScrollPosition={setScrollPosition}
          toggleChooseModal={toggleChooseModal}
        />
      </Modal>
      <Modal
        show={showDetailsModal}
        onClose={toggleDetailsModal}
        style={{ width: "650px" }}
      >
        <Details setShowDetailsModal={setShowDetailsModal} details={details} />
      </Modal>
      {isRegistrationModalOpen && (
        <RegistrationModal
          onCloseRegistration={handleCloseModalRegistration}
          setLoginModalOpen={handleLoginClick}
        />
      )}
      {isLoginModalOpen && (
        <LoginModal
          setRegistrationModalOpen={handleRegistrationClick}
          onCloseLogin={handleCloseModalLogin}
        />
      )}
    </div>
  ) : (
    <>
      {isRegistrationModalOpen && (
        <RegistrationModal
          onCloseRegistration={handleCloseModalRegistration}
          setLoginModalOpen={handleLoginClick}
        />
      )}
      {isLoginModalOpen && (
        <LoginModal
          setRegistrationModalOpen={handleRegistrationClick}
          onCloseLogin={handleCloseModalLogin}
        />
      )}
      <div>
        <p className="marked">
          <span style={{ color: "#007EFF" }}>Зафіксовано, всього</span>
          <b style={{ fontSize: "20px" }}>{amount ? amount : 0}</b>
        </p>
        <div className="btnGroup">
          <div>
            {isFixed ? (
              <div className="blockFixed">
                <p
                  style={{ padding: "0 10px 10px", backgroundColor: "#04c65d" }}
                >
                  <Image
                    src={marked}
                    alt="marked"
                    style={{ margin: "0 auto" }}
                  />
                  Зафіксовано
                </p>
                <button
                  className="btnFixed"
                  onClick={() => handleFixedCancel({ fetchName, categoryName })}
                >
                  Скасувати <br />
                  заявку
                </button>
              </div>
            ) : (
              <button
                className="btnPrimary"
                style={{ margin: "0", border: "1px solid #1888fa" }}
                onClick={
                  user
                    ? fetchName
                      ? toggleChooseModal
                      : handleFixed
                    : handleLoginClick
                }
              >
                Зафіксувати
              </button>
            )}
          </div>
          <div>
            <button
              className="btnSecondary"
              style={{ margin: "0" }}
              onClick={toggleDetailsModal}
            >
              Детальніше
            </button>
          </div>
        </div>
        <Modal show={showChooseModal} onClose={toggleChooseModal}>
          <ChooseLandForPrivate
            setShowChooseModal={setShowChooseModal}
            fetchName={fetchName}
            categoryName={categoryName}
            scrollPosition={scrollPosition}
            setScrollPosition={setScrollPosition}
          />
        </Modal>
        <Modal show={showDetailsModal} onClose={toggleDetailsModal}>
          <Details
            setShowDetailsModal={setShowDetailsModal}
            details={details}
          />
        </Modal>
      </div>
    </>
  );
};

export default ButtonsGroup;
