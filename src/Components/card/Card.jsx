import { useContext } from "react";
import { Link } from 'react-router-dom';

import { ThemeContext } from "../../providers/ThemeProvider";

import styles from "./Card.module.css";

const Card = (props) => {

  const { dentista } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={theme === "light" ? `card dark` : `card`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>   
          <Link to={`/detail/${dentista.matricula}`}>
            <h5 className={`card-title ${styles.title}`}>{dentista.nome} {dentista.sobrenome}</h5>      
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
