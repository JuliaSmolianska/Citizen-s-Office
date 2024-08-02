"use client";
import ButtonsGroup from "@components/ButtonsGroup";
import "../styles/globals.css";
import useScreen from "../hooks/useScreen";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { useUser } from "@hooks/useUser";
import { withdrawalFromCitizenship } from "@APIrest/serviceUserRest";
import { cititzenUkr } from "@app/data/data";
import SuccessApply from "./SuccessApply";
import Modal from "@components/Modal/Modal";
import Loader from "./Loader/Loader";

const UkrainianCitizen = ({ amount }) => {
  const screenSize = useScreen();
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const { user, serviceUser, setServiceUser } = useUser();
  const isFixed = serviceUser.withdrawalFromCitizenship.fixed;

  const toggleApplyModal = () => {
    setShowApplyModal(!showApplyModal);
  };

  const handleFixed = async () => {
    setLoading(true);
    setShowApplyModal(true);
    const payload = {
      fixed: true,
    };
    const token = user.token;
    try {
      const response = await withdrawalFromCitizenship(payload, token);
      const timerPromise = new Promise((resolve) => setTimeout(resolve, 2000));
      const [res] = await Promise.all([response, timerPromise]);
      if (response.status === "success") {
        setServiceUser((prevState) => ({
          ...prevState,
          withdrawalFromCitizenship: {
            ...prevState.withdrawalFromCitizenship,
            fixed: true,
          },
        }));
        setRequestSuccess(true);
      } else {
        setError("Сталась помилка сервера, спробуйте ще раз!");
      }
    } catch (error) {
      setError("Сталась помилка сервера, спробуйте ще раз!");
    } finally {
      setLoading(false);
      setError("");
      setTimeout(() => setShowApplyModal(false), 5000);
    }
  };

  const handleFixedCancel = async () => {
    setLoading(true);
    setShowApplyModal(true);
    const payload = {
      fixed: false,
    };
    const token = user.token;
    try {
      const response = await withdrawalFromCitizenship(payload, token);
      const timerPromise = new Promise((resolve) => setTimeout(resolve, 2000));
      const [res] = await Promise.all([response, timerPromise]);
      if (response.status === "success") {
        setServiceUser((prevState) => ({
          ...prevState,
          withdrawalFromCitizenship: {
            ...prevState.withdrawalFromCitizenship,
            fixed: false,
          },
        }));
      } else {
        setError("Сталась помилка сервера, спробуйте ще раз!");
      }
    } catch (error) {
      setError("Сталась помилка сервера, спробуйте ще раз!");
    } finally {
      setLoading(false);
      setError("");
      setShowApplyModal(false);
    }
  };

  const totalAmount = Array.isArray(amount)
  ? amount.reduce((sum, value) => sum + value, 0)
  : amount;

  return screenSize === "mobile" ? (
    <div className="container" style={{ marginBottom: "30px" }}>
      <h2
        onClick={() => setShowMore(!showMore)}
        className="titleSecondary"
        style={{ position: "relative", cursor: "pointer" }}
      >
        Громадянство <br />
        України
        {!showMore && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="btnShowInfo"
            style={{ backgroundColor: "#FFF6D2" }}
          >
            <FaChevronDown />
          </button>
        )}
        {showMore && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="btnShowInfo"
            style={{ backgroundColor: "#FFF6D2" }}
          >
            <FaChevronUp />
          </button>
        )}
      </h2>
      <p className="marked">
         <span style={{ color: "#007EFF" }}>Зафіксовано, всього</span>
        <br />
        <b style={{ fontSize: "24px" }}>{totalAmount}</b>
      </p>
      {showMore && (
        <div className={`boxes ${showMore ? "active" : "inactive"}`}>
          <div className="list">
            <p className="discription">{cititzenUkr.description}</p>
            <ButtonsGroup
              handleFixed={handleFixed}
              handleFixedCancel={handleFixedCancel}
              isFixed={isFixed}
              details={cititzenUkr.details}
              amount={amount}
            />
          </div>
        </div>
      )}
      <Modal show={showApplyModal} onClose={toggleApplyModal}>
        {loading ? <Loader /> : requestSuccess && <SuccessApply />}
      </Modal>
    </div>
  ) : (
    <div className="container">
      <h2 className="titleSecondary">Громадянство України</h2>
      <div className="box">
        <div className="list">
          <p className="discription">{cititzenUkr.description}</p>
          <ButtonsGroup
            handleFixed={handleFixed}
            handleFixedCancel={handleFixedCancel}
            isFixed={isFixed}
            details={cititzenUkr.details}
            amount={amount}
          />
        </div>
      </div>
      <Modal
        show={showApplyModal}
        onClose={toggleApplyModal}
        style={{ width: "650px" }}
      >
        {loading ? <Loader /> : requestSuccess && <SuccessApply />}
      </Modal>
    </div>
  );
};

export default UkrainianCitizen;
