import { useContext } from 'react';

import { ThemeContext } from "../../providers/ThemeProvider";

import LoginForm from "../../Components/form/LoginForm";
import Navbar from '../../Components/navbar/Navbar';
import Footer from '../../Components/footer/Footer';

import './login.css';


const Contact = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <>
    <Navbar />

    <div className={theme === 'light' ? 'login-dark' : 'login-light'}>
      <h1>Login</h1>
      <h6>Entre com seus dados para efetuar o Login</h6>
      <LoginForm />
    </div>
    <Footer />
    </>
    
  );
};

export default Contact;
