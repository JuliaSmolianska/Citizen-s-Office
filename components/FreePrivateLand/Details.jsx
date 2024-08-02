import "../../styles/globals.css";

const Details = ({ details }) => {
  return (
    <div className="detailsBox">
      <div>
        <p className="detailsText">{details.details1}</p>
        <p className="detailsText">
          {details.details2}
          {details.details23 && (
            <span style={{ fontWeight: "bold" }}>{details.details23}</span>
          )}
        </p>
        <p className="detailsText">{details.details3}</p>
        <p className="detailsText">{details.details4}</p>
        <p className="detailsText">{details.details5}</p>
        <p className="detailsText">
          {details.details6}{" "}
          {details.details67 && (
            <span>
              <br />
              {details.details67}
            </span>
          )}
        </p>
        <p className="detailsText">{details.details7}</p>
      </div>
      <div className="detailsBlueBlock">
        <p>{details.detailsBlue1}</p>
        {details.detailsBlue2 && (
          <p>
            <br />
            {details.detailsBlue2}
          </p>
        )}
        {details.detailsBlue3 && (
          <p>
            <br />
            {details.detailsBlue3}
          </p>
        )}
        {details.detailsBlue4 && (
          <p>
            <br />
            {details.detailsBlue4}
          </p>
        )}
      </div>
      <div>
        <p className="detailsText">{details.details8}</p>
        <p className="detailsText">{details.details9}</p>
        {details.details10 && (
          <p className="detailsText">{details.details10}</p>
        )}
        {details.details11 && (
          <p className="detailsText">{details.details11}</p>
        )}
        {details.details12 && (
          <p className="detailsText">{details.details12}</p>
        )}
      </div>
    </div>
  );
};

export default Details;
