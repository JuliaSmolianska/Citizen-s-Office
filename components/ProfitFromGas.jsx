"use client";
import ButtonsGroup from "@components/ButtonsGroup";
import "../styles/globals.css";
import useScreen from "../hooks/useScreen";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { partIncome } from "@APIrest/serviceUserRest";
import { useUser } from "@hooks/useUser";
import { partIncomeData } from "@app/data/data";
import SuccessApply from "./SuccessApply";
import Modal from "@components/Modal/Modal";
import Loader from "./Loader/Loader";

const ProfitFromGas = ({ amount }) => {
  const screenSize = useScreen();
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, serviceUser, setServiceUser } = useUser();
  const isFixed = serviceUser.partIncome.fixed;
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

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
      const response = await partIncome(payload, token);
      const timerPromise = new Promise((resolve) => setTimeout(resolve, 2000));
      const [res] = await Promise.all([response, timerPromise]);
      if (response.status === "success") {
        setServiceUser((prevState) => ({
          ...prevState,
          partIncome: {
            ...prevState.partIncome,
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
      const response = await partIncome(payload, token);
      const timerPromise = new Promise((resolve) => setTimeout(resolve, 2000));
      const [res] = await Promise.all([response, timerPromise]);
      if (response.status === "success") {
        setServiceUser((prevState) => ({
          ...prevState,
          partIncome: {
            ...prevState.partIncome,
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
        className="titleSecondary"
        style={{ position: "relative", cursor: "pointer" }}
        onClick={() => setShowMore(!showMore)}
      >
        Прибуток <br /> від видобутку
        <br />
        нафти, газу та ін.
        {!showMore && (
          <button
            onClick={() => setShowMore(true)}
            className="btnShowInfo"
            style={{ backgroundColor: "#FFF6D2" }}
          >
            <FaChevronDown />
          </button>
        )}
        {showMore && (
          <button
            onClick={() => setShowMore(false)}
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
            <p className="discription">{partIncomeData.description}</p>
            <ButtonsGroup
              handleFixed={handleFixed}
              handleFixedCancel={handleFixedCancel}
              isFixed={isFixed}
              details={partIncomeData.details}
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
      <h2 className="titleSecondary">
        Прибуток від видобутку
        <br />
        нафти, газу та ін.
      </h2>
      <div className="box">
        <div className="list">
          <p className="discription">{partIncomeData.description}</p>
          <ButtonsGroup
            handleFixed={handleFixed}
            handleFixedCancel={handleFixedCancel}
            isFixed={isFixed}
            details={partIncomeData.details}
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

export default ProfitFromGas;
