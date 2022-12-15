import { useContext, useEffect } from  'react';

import { DentistContext } from "../../contexts/DentistContext";
import { AuthContext } from "../../providers/AuthContext";
import { ThemeContext } from "../../providers/ThemeProvider";

import Navbar from '../../Components/navbar/Navbar';
import Footer from '../../Components/footer/Footer';

import DetailCard from "../../Components/card/DetailCard";

import './detail.css';

const Detail = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  const { userData } = useContext(AuthContext);
  const { dentista, error, loading, getDentistas } = useContext(DentistContext);

  useEffect(() => {
    getDentistas();
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
  }, []);

  return (
    <div className={theme === 'light' ? 'detail-dark' : 'detail-light'}>
    <Navbar />
    <DetailCard dentista={dentista}/>
    <Footer />
    </div>
  )
}

export default Detail;