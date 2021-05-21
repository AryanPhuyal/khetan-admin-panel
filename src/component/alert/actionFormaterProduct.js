import { Link } from "react-router-dom";

const ActionFormatter = (onclick, link, stat) => [
  <Link to={link} className="btn btn-outline-primary btn-sm">
    <span className="lnr lnr-eye"></span>
  </Link>,
  stat !== 2 && (
    <button className="btn btn-success btn-sm rounded" onClick={onclick}>
      <span className="lnr lnr-thumbs-up"></span>
    </button>
  ),
  stat !== 3 && (
    <button className="btn btn-danger btn-sm rounded" onClick={onclick}>
      <span className="lnr lnr-thumbs-down"></span>
    </button>
  ),
];
export default ActionFormatter;
