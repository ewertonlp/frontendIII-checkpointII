import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Switch from "react-switch";
import { FiSun, FiMoon } from "react-icons/fi"; 

import { AuthContext } from "../../providers/AuthContext";
import { ThemeContext } from "../../providers/ThemeProvider";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  const { userData, emptyUserData } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogin() {
    navigate("./home");
  }

  function handleLogout() {
    localStorage.clear();
    emptyUserData();
    navigate("./");
  }

  return (
    <header className="sticky-top">
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar navbar-dark bg-dark ou navbar-light bg-light*/}
      <nav
        // className={`navbar navbar-expand-sm navbar-light bg-light`}
        className={theme === 'dark' ? 'navbar navbar-expand-sm navbar-light bg-light' : 'navbar navbar-expand-sm navbar-dark bg-dark'}
        aria-label="Third navbar example"
      >
        <div className="container">
          {/* Ao clicar, o usuário deve ser redirecionado a home, com react-router ok*/}
          <Link className={`navbar-brand ${styles.navbarBrand}`} to="/home">
            DH Odonto
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
          >
            <ul className="navbar-nav mb-2 mb-sm-0">
              <li className={`nav-item ${styles.navBarLink}`}>
                {/* Ao clicar, o usuário deve ser redirecionado a home, com react-router  ok*/}
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className={`nav-item ${styles.navBarLink}`}>
                {/* Se o usuário estiver logado, deverá aparecer um botão de logout
                que vai apagar o token do localstorage.
                Se o usuário estiver deslogado, um link fará um redirecionamento, com react-router,
                ao formulário de login
                O botão de logout deverá ser testado darkmode
                se sim, btn-dark, se não, btn-light */}
                {userData ? (
                  <button onClick={handleLogout} className={theme === 'light' ? 'nav-link btn-dark' : 'nav-link btn-light'} >Logout</button> 
                  ) : ( 
                  <button onClick={handleLogin} className="nav-link dark" >Login</button>
                  )}
                {/* <a className="nav-link" href="/">
                  Login
                </a> */}
              </li>
              <li className={`nav-item`}>
                {/* Ao ser clicado, esse botão mudará a aplicação para dark mode ou light mode.
                 Lembre-se de usar um estado no contexto para fazer essa alteração.
                 Na linha seguinte deverá ser feito um teste se a aplicação
                 está em dark mode e deverá utilizar o icone ☀ ou 🌙 e btn-dark ou btn-light*/}
                <div className={`btn btn-light${styles.btnStyle}`}>
                  <FiSun className={theme === 'light' ? `nav-icon nav-icon-dark` : `nav-icon`} />
                  <Switch
                    onChange={handleTheme}
                    checked={theme === "light"}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={18}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                    height={12}
                    width={30}
                    className="react-switch"
                    id="material-switch"
                  />
                  <FiMoon className={theme === 'light' ? `nav-icon nav-icon-dark` : `nav-icon`} />
                </div>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
