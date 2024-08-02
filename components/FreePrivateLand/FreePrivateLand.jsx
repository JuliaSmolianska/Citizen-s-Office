"use client";
import "../../styles/globals.css";
import { freePrivatLand, freePrivatLandDetails } from "@app/data/data";
import ButtonsGroup from "@components/ButtonsGroup";
import useScreen from "../../hooks/useScreen";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { useUser } from "@hooks/useUser";
import Loader from "@components/Loader/Loader";
import Modal from "@components/Modal/Modal";
import {
  cottageConstruction,
  garageConstruction,
  houseConstruction,
  landForFarming,
  landForGardening,
} from "@APIrest/serviceUserRest";

const FreePrivateLand = ({ amount, scrollPosition, setScrollPosition }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const screenSize = useScreen();
  const [showMore, setShowMore] = useState(false);
  const { user, serviceUser, setServiceUser } = useUser();
  const fetchFunctions = {
    houseConstruction: houseConstruction,
    cottageConstruction: cottageConstruction,
    garageConstruction: garageConstruction,
    landForGardening: landForGardening,
    landForFarming: landForFarming,
  };

  const handleFixedLandCancel = async ({ fetchName, categoryName }) => {
    setLoading(true);
    setShowLoadingModal(true);
    const payload = {
      fixed: false,
      state: "",
    };
    const token = user.token;
    try {
      const response = await fetchName(payload, token);
      const timerPromise = new Promise((resolve) => setTimeout(resolve, 2000));
      const [res] = await Promise.all([response, timerPromise]);
      if (response.status === "success") {
        setServiceUser((prevState) => ({
          ...prevState,
          [categoryName]: {
            ...prevState[categoryName],
            fixed: false,
            state: "",
          },
        }));
      } else {
        setError("Сталась помилка сервера, спробуйте ще раз!");
      }
    } catch (error) {
      localStorage.removeItem('userCurrent');
      window.location.reload();
      setError("Сталась помилка сервера, спробуйте ще раз!");
    } finally {
      setLoading(false);
      setError("");
      setShowLoadingModal(false);
    }
  };

  const totalAmount = Object.values(amount).slice(0, 5).reduce(
    (sum, value) => sum + (value || 0),
    0
  );

  return screenSize === "mobile" ? (
    <div className="container" style={{ marginBottom: "30px" }}>
      <h2
        className="titlePrimary"
        style={{ position: "relative", cursor: "pointer" }}
        onClick={() => setShowMore(!showMore)}
      >
        Безкоштовна
        <br />
        приватизація
        <br />
        землі
        {!showMore && (
          <button
            onClick={() => setShowMore(true)}
            className="btnShowInfo"
            style={{ backgroundColor: "#CDE9FF" }}
          >
            <FaChevronDown />
          </button>
        )}
        {showMore && (
          <button
            onClick={() => setShowMore(false)}
            className="btnShowInfo"
            style={{ backgroundColor: "#CDE9FF" }}
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
        <ul className={`boxes ${showMore ? "active" : "inactive"}`}>
          {freePrivatLand.map((item) => (
            <li key={item.id} className="list">
              <div className="discription">
                <p>
                  {item.discription1}
                  <b>{item.discription2}</b>
                  {item.discription3 && <span>{item.discription3}</span>}
                </p>
              </div>
              <ButtonsGroup
                handleFixedCancel={handleFixedLandCancel}
                fetchName={fetchFunctions[item.categoryName]}
                categoryName={item.categoryName}
                isFixed={serviceUser[item.categoryName].fixed}
                details={freePrivatLandDetails}
                amount={amount[item.categoryName]}
                scrollPosition={scrollPosition}
                setScrollPosition={setScrollPosition}
              />
            </li>
          ))}
        </ul>
      )}
      <Modal show={showLoadingModal} onClose={!showLoadingModal}>
        {loading && <Loader />}
      </Modal>
    </div>
  ) : (
    <div className="container">
      <h2 className="titlePrimary">
        Безкоштовна
        <br />
        приватизація землі
      </h2>
      <ul className="box">
        {freePrivatLand.map((item) => (
          <li key={item.id} className="list">
            <div className="discription">
              <p>
                {item.discription1}
                <b>{item.discription2}</b>
                {item.discription3 && <span>{item.discription3}</span>}
              </p>
            </div>
            <ButtonsGroup
              handleFixedCancel={handleFixedLandCancel}
              fetchName={fetchFunctions[item.categoryName]}
              categoryName={item.categoryName}
              isFixed={serviceUser[item.categoryName].fixed}
              details={freePrivatLandDetails}
              amount={amount[item.categoryName]}
              scrollPosition={scrollPosition}
              setScrollPosition={setScrollPosition}
            />
          </li>
        ))}
      </ul>
      <Modal
        show={showLoadingModal}
        onClose={!showLoadingModal}
        style={{ width: "650px" }}
      >
        {loading && <Loader />}
      </Modal>
    </div>
  );
};

export default FreePrivateLand;
