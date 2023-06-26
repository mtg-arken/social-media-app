import { Link } from "react-router-dom";

export default function Footer(params) {
  return (
    <div  className=" card my-3">
      <div className=" card-body d-flex justify-content-between align-items-center ">
        <div className=" card-subtitle  text-muted">Card Subtitle</div>
        <Link to="#">Read</Link>
      </div>
    </div>
  );
}
