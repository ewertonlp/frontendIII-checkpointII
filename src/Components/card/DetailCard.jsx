import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import { AuthContext } from "../../providers/AuthContext";
import { ThemeContext } from "../../providers/ThemeProvider";
import ScheduleFormModal from "../schedule/ScheduleFormModal";
import { ToastContainer, toast } from "react-toastify";


import styles from "./DetailCard.module.css";

const DetailCard = () => {
  const { theme } = useContext(ThemeContext);

  const { id } = useParams();
  const [dentista, setDentista] = useState({});

  const user = [];

  useEffect(() => {
    getDentistById();
  }, []);

  async function getDentistById() {
    try {
      const response = await api.get(`/dentista?matricula=${id}`);
      setDentista(response.data);
      user.push(dentista.user);
    } catch (error) {
      toast.error('Erro ao buscar dentista');
    }
  }

 let name = "";

 for (const key in dentista) {
  name = dentista[key].username;
 }

  return (
    <>
      <h1>Informações do Dentista {dentista.nome} </h1>
      <section className="card col-sm-12 col-lg-6 mb-5 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={theme === 'light' ? `card-body ${styles.cardDark}  row` : 'card-body row'}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {dentista.nome}</li>
              <li className="list-group-item">
                Sobrenome: {dentista.sobrenome}
              </li>
              <li className="list-group-item">
                Usuário: {name}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={theme === 'light' ? `btn btn-dark ${styles.button
                }` : `btn btn-light ${styles.button
                  }`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
      <ToastContainer />
    </>
  );
};

export default DetailCard;
