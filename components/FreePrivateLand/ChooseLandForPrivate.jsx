"use client";
import "../../styles/globals.css";
import useScreen from "../../hooks/useScreen";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@hooks/useUser";
import selected from "../../icons/markedSelected.svg";
import Image from "next/image";
import { chooseLandModal, regions, disabledRegions } from "@app/data/data";
import SuccessApply from "@components/SuccessApply";
import Loader from "../Loader/Loader";

const ChooseLandForPrivate = ({
  fetchName,
  categoryName,
  setShowChooseModal,
  scrollPosition,
  setScrollPosition,
  toggleChooseModal,
}) => {
  const screenSize = useScreen();
  const { user, setServiceUser } = useUser();
  const scrollContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fixed, setFixed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [continie, setContinie] = useState(false);

  const handleFixedLand = async () => {
    if (!selectedRegion) {
      setError("Будь ласка, оберіть область!");
      return;
    }
    setLoading(true);
    const payload = {
      fixed: true,
      state: selectedRegion,
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
            fixed: true,
            state: selectedRegion,
          },
        }));
        setFixed(true);
      }
    } catch (error) {
      toggleChooseModal();
      localStorage.removeItem('userCurrent');
      window.location.reload();
      setError("Сталась помилка сервера, спробуйте ще раз!");
    } finally {
      setLoading(false);
      setError("");
      setTimeout(() => setShowChooseModal(false), 5000);
    }
  };

  const handleSelectRegion = (event) => {
    const selectedValue = event.target.getAttribute("data-value");
    if (!disabledRegions.includes(selectedValue)) {
      setSelectedRegion(selectedValue);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollTop);
    }
  };

  const handleContinie = () => {
    setContinie(!continie);
  };

  const ChooseLandMobile = () => {
    if (loading) {
      return <Loader />;
    }
    if (fixed) {
      return <SuccessApply />;
    }
    return (
      !fixed && (
        <div className="chooseRegion">
          {!continie ? (
            <>
              <p>{chooseLandModal[0]}</p>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button className="btnPrimary" onClick={handleContinie}>
                  Продовжити
                </button>
              </div>
            </>
          ) : (
            <>
              <p style={{ margin: "20px 0" }}>{chooseLandModal[1]}</p>
              <div
                className="scrollContainer"
                ref={scrollContainerRef}
                onScroll={handleScroll}
              >
                <div className="scrollContent">
                  <ul>
                    {regions.map((item, index) => (
                      <li
                        className={
                          selectedRegion === item
                            ? "isSelected"
                            : disabledRegions.includes(item)
                            ? "disabled"
                            : "select"
                        }
                        key={index}
                        data-value={item}
                        onClick={handleSelectRegion}
                        style={{
                          pointerEvents: disabledRegions.includes(item)
                            ? "none"
                            : "auto",
                          opacity: disabledRegions.includes(item) ? 0.5 : 1,
                        }}
                      >
                        {selectedRegion === item && (
                          <Image
                            src={selected}
                            alt="selected"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {error && (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    color: "#1888fa",
                  }}
                >
                  {error}
                </div>
              )}
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button className="btnPrimary" onClick={handleFixedLand}>
                  Продовжити
                </button>
              </div>
            </>
          )}
        </div>
      )
    );
  };

  const ChooseLandTabletDesktop = () => {
    if (loading) {
      return <Loader />;
    }
    if (fixed) {
      return <SuccessApply />;
    }
    return (
      !fixed && (
        <div className="chooseRegion">
          <p>{chooseLandModal[0]}</p>
          <p style={{ margin: "20px 0" }}>{chooseLandModal[1]}</p>
          <div
            className="scrollContainer"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            <div className="scrollContent">
              <ul>
                {regions.map((item, index) => (
                  <li
                    className={
                      selectedRegion === item
                        ? "isSelected"
                        : disabledRegions.includes(item)
                        ? "disabled"
                        : "select"
                    }
                    key={index}
                    data-value={item}
                    onClick={handleSelectRegion}
                    style={{
                      pointerEvents: disabledRegions.includes(item)
                        ? "none"
                        : "auto",
                      opacity: disabledRegions.includes(item) ? 0.5 : 1,
                    }}
                  >
                    {selectedRegion === item && (
                      <Image
                        src={selected}
                        alt="selected"
                        style={{ marginRight: "5px" }}
                      />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {error && (
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                color: "#1888fa",
              }}
            >
              {error}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="btnPrimary" onClick={handleFixedLand}>
              Продовжити
            </button>
          </div>
        </div>
      )
    );
  };

  return screenSize === "mobile"
    ? ChooseLandMobile()
    : ChooseLandTabletDesktop();
};

export default ChooseLandForPrivate;
