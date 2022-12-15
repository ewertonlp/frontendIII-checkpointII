import { useEffect, useState, useContext } from "react";

import Navbar from '../../Components/navbar/Navbar';
import Footer from '../../Components/footer/Footer';

import Card from "../../Components/card/Card";
import { DentistContext } from "../../contexts/DentistContext";
import { ThemeContext } from "../../providers/ThemeProvider";

import './home.css';


const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { dentista, getDentistas } = useContext(DentistContext);

  useEffect(() => {
    getDentistas();
  }, []);


  return (
    <>
      <Navbar />
      <div className={theme === 'dark' ? 'home-light' : 'home-dark'}>
        <h1>Home</h1>
        <div className={theme === 'light' ? 'home-dark card-grid container' : 'home-light card-grid container'}>
         {dentista.map((dentista) => (
           <Card key={dentista.matricula} dentista={dentista}/>
           ))}
        </div>
           </div>
        <Footer />
    </>
    
  );
};

export default Home;
