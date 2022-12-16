import { useContext, useEffect } from  'react';

import { DentistContext } from "../../contexts/DentistContext";
import { ThemeContext } from "../../providers/ThemeProvider";

import Navbar from '../../Components/navbar/Navbar';
import Footer from '../../Components/footer/Footer';

import DetailCard from "../../Components/card/DetailCard";

import './detail.css';

const Detail = () => {
  const { theme } = useContext(ThemeContext);
  const { dentista, getDentistas } = useContext(DentistContext);

  useEffect(() => {
    getDentistas();
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