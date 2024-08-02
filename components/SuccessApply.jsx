import "../styles/globals.css";
import { successApplyModal } from "@app/data/data";
import done_ring from "../icons/done_ring.svg";
import Image from "next/image";

const SuccessApply = () => {
  return (
    <div style={{ maxWidth: "405px", margin: "50px auto" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image src={done_ring} alt="done_ring" />
      </div>
      <p className="doneSelectedTitle">{successApplyModal[0]}</p>
      <p style={{ textAlign: "center" }}>
        {successApplyModal[1]}
        <br />
        <b style={{ textAlign: "center" }}>{successApplyModal[2]}</b>
      </p>
      <br />
      <p style={{ textAlign: "center" }}>{successApplyModal[3]}</p>
    </div>
  );
};

export default SuccessApply;
