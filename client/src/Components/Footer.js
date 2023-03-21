import { Card } from "react-bootstrap";

export default function Footer(params) {
  return (
    <div  className=" card my-3">
      <div className=" card-body d-flex justify-content-between align-items-center ">
        <div className=" card-subtitle  text-muted">Card Subtitle</div>
        <a href="#">Read</a>
      </div>
    </div>
  );
}
