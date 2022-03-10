import member from "./member.jpeg";
import { Link } from "react-router-dom";

const BandMemberCard = (props) => {
  return (
    <div className="band-member-card">
      <Link
        to={`/band-member/${props.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <p>{props.fullName}</p>
      </Link>

      <img src={member} alt="" />
    </div>
  );
};

export default BandMemberCard;
