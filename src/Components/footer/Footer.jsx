import { useContext } from 'react';
import { ThemeContext } from "../../providers/ThemeProvider";

import { FiFacebook, FiInstagram, FiYoutube, FiTwitter  } from "react-icons/fi";

import styles from "./Footer.module.css";

const Footer = () => {
  const { theme } = useContext(ThemeContext);


  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }
  return (
    <footer>
      <div className={styles.footerWrapper}>
        <button className={`btn btn-danger ${styles.top}`} onClick={scrollToTop}>Voltar para o topo</button>
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a class navbar-dark bg-dark ou navbar-light bg-light  */}
        <div className={theme === 'dark' ? `navbar-light bg-light ${styles.footer}` : `navbar-dark bg-dark ${styles.footer}`}>
          <div className="container">
            <div className={`row`}>
              <div className="col-sm-12 col-lg-6">
                {/* //Na linha seguinte deverá ser feito um teste se a aplicação
                // está em dark mode e deverá utilizar o css correto */}
                <img className={theme === "light" ? `${styles.dhLogo} ${styles.dhLogoDark}` : `${styles.dhLogo} ${styles.dhLogoLight}`} src="/images/DH.png" alt='DH-logo' />
              </div>
              <div className={theme === "light" ? `col-sm-12 col-lg-6 ${styles.icons} ${styles.iconsDark}` : `col-sm-12 col-lg-6 ${styles.icons} ${styles.iconsLight}`}>
                <FiFacebook className={styles.icon} />
                <FiInstagram className={styles.icon} />
                <FiTwitter className={styles.icon} />
                <FiYoutube className={styles.icon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer >
  )
}

export default Footer