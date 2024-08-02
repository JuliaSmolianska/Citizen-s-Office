"use client";

import { useState, useEffect } from "react";
import "../../styles/globals.css";
import s from "./Election.module.css";
import {
  getAllCandidates,
  giveVoice,
  deleteVoice,
} from "@APIrest/electionRest";
import Modal from "@components/Modal/Modal";
import useScreen from "../../hooks/useScreen";
import { useUser } from "@hooks/useUser";
import Image from "next/image";
import monitor from "../../icons/monitor-user.svg";
import flag from "../../icons/flag-for-ukraine.svg";
import { election } from "../../app/data/data";
import SuccessApplyElection from "./SuccessApplyElection";
import RegistrationModal from "../Navbar/components/RegistrationModal/Registration";
import LoginModal from "../Navbar/components/LoginModal/Login";
import Loader from "../Loader/Loader";

const Election = () => {
  const screenSize = useScreen();
  const { user } = useUser();
  const [candidates, setCandidates] = useState([]);
  const [showAddCandidatModal, setShowAddCandidatModal] = useState(false);
  const [showSuccessApplyElection, setShowSuccessApplyElection] =
    useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [isVoiced, setIsVoiced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [showCancelVoiceModal, setShowCancelVoiceModal] = useState(false);
  const [audioSrc, setAudioSrc] = useState(""); // Доданий стан для аудіо

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await getAllCandidates();
        const candidatesList = response.data.result;
        setCandidates(candidatesList);
        console.log(candidatesList);
      } catch (error) {
        console.error("Помилка отримання інформації про кандидатів:", error);
      }
    };

    fetchService();
  }, []);

  const addVoice = async (_id) => {
    setIsVoiced(false);
    setLoading(true);
    setShowSuccessApplyElection(true);
    const token = user.token;
    try {
      const response = await giveVoice(_id, token);
      if (response.status === 201) {
        const getCandidates = await getAllCandidates();
        setCandidates(getCandidates.data.result);
        setRequestSuccess(true);

        if (_id === "66a5df2f17fe336bf26bc608") {
          setAudioSrc("/audio/Порошенко.m4a");
        } else if (_id === "66a5dd2d681aec6f27d0ba10") {
          setAudioSrc("/audio/Зеленський.m4a");
        } else if (_id === "66a5df57681aec6f27d84b41") {
          setAudioSrc("/audio/Залужний.m4a");
        } else if (_id === "66a5df7e17fe336bf26cd048") {
          setAudioSrc("/audio/Корчинський.m4a");
        }
      } else {
        return candidates;
      }
    } catch (error) {
      if (error.message === "You have already voted") {
        setIsVoiced(true);
        setRequestSuccess(true);
      } else {
        console.log(error);
      }
    } finally {
     setTimeout(() => setLoading(false), 2000);
    }
  };

  const removeVoice = async () => {
    toggleSuccessApplyElection();
    setLoadingCancel(true);
    setShowCancelVoiceModal(true);
    setAudioSrc("");
    const token = user.token;
    try {
      const response = await deleteVoice(token);
      if (response.status === 201) {
        const getCandidates = await getAllCandidates();
        setCandidates(getCandidates.data.result);
        setIsVoiced(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setLoadingCancel(false), 2000);
      setTimeout(() => setShowCancelVoiceModal(false), 2000);
    }
  };

  const toggleShowCancelVoiceModal = () => {
    setShowCancelVoiceModal(!showCancelVoiceModal);
  };

  const toggleAddCandidatModal = () => {
    setShowAddCandidatModal(!showAddCandidatModal);
  };

  const toggleSuccessApplyElection = () => {
    setShowSuccessApplyElection(!showSuccessApplyElection);
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

  let totalVoice = 0;

  candidates.forEach((candidate) => {
    totalVoice += candidate.voice;
  });

  return (
    <div className="container">
      {screenSize === "mobile" ? (
        <>
          <h2 className={s.title} style={{marginBottom:'0'}}>За кого би ви проголосували на</h2>
          <h2 className={s.title} style={{marginTop:'-10px'}}>
            {" "}
            виборах президента
            <span style={{ padding: "5px 10px 0" }}>
              <Image src={flag} alt="ukr-flag" />
            </span>
            зараз:
          </h2>
        </>
      ) : (
        <h2 className={s.title}>
          За кого би ви проголосували на виборах президента
          <span style={{ padding: "5px 10px 0" }}>
            <Image src={flag} alt="ukr-flag" />
          </span>
          зараз:
        </h2>
      )}
      {candidates.length !== 0 && (
        <div className={s.candidates}>
          {candidates.map((item) => (
            <div key={item._id} className={s.candidatBox}>
              <div
                className={s.candidatContent}
                onClick={() => (user ? addVoice(item._id) : handleLoginClick())}
              >
                <Image
                  src={item.photo}
                  alt={item.name}
                  width={screenSize === "mobile" ? "125" : "200"}
                  height={screenSize === "mobile" ? "125" : "189"}
                />
                <p className={s.candidatName}>{item.name}</p>
                <p className={s.chooseCandidat}>{election.text1}</p>
              </div>
              <p className={s.statistics}>
                {item.voice} {election.text2}
                <br /> {item.percent} %
              </p>
            </div>
          ))}
          <div
            className={s.addCandidate}
            onClick={user ? toggleAddCandidatModal : handleLoginClick}
          >
            <div>
              <Image
                src={monitor}
                alt="monitor"
                className={s.addCandidateIcon}
              />
              <p className={s.addCandidateText}>{election.text3}</p>
            </div>
          </div>
          <Modal
            show={showAddCandidatModal}
            onClose={toggleAddCandidatModal}
            style={{ width: screenSize === "mobile" ? "" : "650px" }}
          >
            <div className={s.addCandidateInfo}>
              <p>{election.text4}</p>
              <br />
              <p>{election.text5}</p>
            </div>
          </Modal>
        </div>
      )}
      <p className={s.text1}>
        {election.text6} {totalVoice} {election.text7}
      </p>
      <p className={s.text2}>{election.text8}</p>
      <Modal
        show={showSuccessApplyElection}
        onClose={toggleSuccessApplyElection}
        style={{ width: screenSize === "mobile" ? "" : "650px" }}
      >
        {loading ? (
          <Loader />
        ) : (
          requestSuccess && (
            <SuccessApplyElection
              isVoiced={isVoiced}
              removeVoice={removeVoice}
            />
          )
        )}
      </Modal>
      {loadingCancel && (
        <Modal
          show={showCancelVoiceModal}
          onClose={toggleShowCancelVoiceModal}
          style={{ width: screenSize === "mobile" ? "" : "650px" }}
        >
          <Loader />
        </Modal>
      )}
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
      {audioSrc && (
        <audio
          src={audioSrc}
          autoPlay
          preload="auto"
          onEnded={() => setAudioSrc("")} // Скидання аудіо після завершення
        ></audio>
      )}
    </div>
  );
};

export default Election;
