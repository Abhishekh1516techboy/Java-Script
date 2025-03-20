import "./card.css";

const Card = ({ title, desc}) => {
  return (
    <div className="card-container">
      <div className="card">
        <h2 className="card-header">{title}</h2>
        <p className="card-para">{desc}</p>
        <button className="card-Btn">Read More</button>
      </div>
    </div>
  );
};

export default Card;
