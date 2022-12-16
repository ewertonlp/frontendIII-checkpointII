import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../providers/AuthContext";
import { DentistContext } from "../../contexts/DentistContext";
import { ThemeContext } from "../../providers/ThemeProvider";
import api from "../../services/api";

import styles from "./ScheduleForm.module.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ScheduleForm = () => {
  const { theme } = useContext(ThemeContext);
  const { dentista, paciente } = useContext(DentistContext);
  const { userData } = useContext(AuthContext);

  const [dentist, setDentist] = useState([]);
  const [patient, setPatient] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    agendarConsulta();
    event.target.reset();
  };

  const agendarConsulta = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${userData}`,
        'Content-Type': 'application/json',
        'Accept':'/',
      },
    };

    const body = JSON.stringify({
      paciente: {
        matricula: patient,
      },
      dentista: {
        matricula: dentist,
      },
      dataHoraAgendamento: appointmentDate,
    });

    try {
      const response = await api.post("/consulta", body, headers);
      alert("Sua consulta foi agendada.");
    } catch (error) {
      toast.error("Agendamento de consultas temporariamente indisponível.", {
        autoClose: 2500,
        position: 'top-center',
        theme: 'colored',
      })
    }
  };

  return (
    <>
      <div className={theme === 'light' ? `text-center container ${styles.cardDark}` : `text-center container`}>
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentista
              </label>
              <select
              value={dentist.matricula}
              onChange={(event) => {
                setDentist(event.target.value);
              }}
              className="form-select"
              name="dentist"
              id="dentist"
              >
                
                {dentista.map((dentista) => (
                <option
                  key={dentista.matricula}
                  value={dentista.matricula}
                >
                  {dentista.nome} {dentista.sobrenome}
                </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Paciente
              </label>
              <select
              value={patient.matricula}
              onChange={(event) => setPatient(event.target.value)}
              className="form-select"
              name="patient" 
              id="patient">
                {paciente?.map((paciente) => (
                <option
                  key={paciente.matricula}
                  value={paciente.matricula}
                >
                  {paciente.nome} {paciente.sobrenome}
                </option>
                ))}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Data
              </label>
              <input
              value={appointmentDate}
              onChange={(event) => setAppointmentDate(event.target.value)}
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <button className={theme === 'light' ? `btn btn-dark ${styles.button}` : `btn btn-light${styles.button}`} type="submit">
              Agendar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
