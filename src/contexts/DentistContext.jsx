import { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

export const DentistContext = createContext({});
export const PacientContext = createContext({});

const DentistProvider = ({ children }) => {

  const { id } = useParams(); 
  const [dentista, setDentista] = useState([]);
  const [paciente, setPaciente] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDentistas();
  }, []);

  async function getDentistas() {
    setLoading(true);
    try {
      const getToken = localStorage.getItem("token");
      const response = await api.get(`/dentista?matricula${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`}
      });
      setDentista(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPacientes();
  }, []);

  async function getPacientes() {
    setLoading(true);
    try {
      const getToken = localStorage.getItem("token");
      const response = await api.get("/paciente", {
        headers: {Authorization: `Bearer ${getToken}`}
      });
      setPaciente(response.data.body);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
  <DentistContext.Provider value={{ dentista, paciente, error, loading, getDentistas, getPacientes }}>
    {children}
  </DentistContext.Provider>
  );
};

export default DentistProvider;
