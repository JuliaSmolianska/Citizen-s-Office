import "../../styles/globals.css";
import s from "./Election.module.css";
import { election } from "../../app/data/data";
import done_ring from "../../icons/done_ring.svg";
import Image from "next/image";

const SuccessApplyElection = ({ isVoiced, removeVoice }) => {
  return (
    <div style={{ maxWidth: "405px", margin: "50px auto" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image src={done_ring} alt="done_ring" />
      </div>
      {isVoiced ? (
        <p className="doneSelectedTitle">{election.voiced7} </p>
      ) : (
        <p className="doneSelectedTitle">{election.voiced1}</p>
      )}
      <div style={{ textAlign: "center" }}>
        <button className={s.btnCancelVoised} onClick={removeVoice}>
          {election.voiced2}
        </button>
      </div>
      <br />
      <div className={s.voiced}>
        <p>
          {election.voiced3} <br />
          <b>{election.voiced4}</b>.
        </p>
        <br />
        <p>{election.voiced5}</p>
        <br />
        <p>{election.voiced6}</p>
      </div>
    </div>
  );
};

export default SuccessApplyElection;
