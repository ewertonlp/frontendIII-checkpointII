import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import api from "../../services/api";

import { AuthContext } from "../../providers/AuthContext";
import { ThemeContext } from "../../providers/ThemeProvider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import styles from "./Form.module.css";

const LoginForm = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  const { userData, fillUserDataState } = useContext(AuthContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    auth();
  };

  async function auth() {
    try {
      const response = await api.post("/auth", {
        username,
        password,
      });
      toast.success('Login efetuado com sucesso.', {
        type: 'success',
        autoClose: 2000,
        position: 'top-center',
        theme: 'colored',
      });
      localStorage.setItem("token", response.data.token);
      navigate("/home");
      fillUserDataState({
        token: response.data.token,
      });

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error("Erro ao fazer login, tente navamente", {
        autoClose: 2500,
        position: 'top-center',
        theme: 'colored',
      });
    }
  }

  return (
    <>
      
      <div
        className={
          theme === "light"
            ? `text-center card container ${styles.card} bg-dark`
            : `text-center card ${styles.card} bg-light`
        }
      >
        <h3>{userData.token}</h3>
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.form_input_user}
              placeholder="Login"
              name="login"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <div className={styles.container_password}>
              <input
                className={styles.form_input_password}
                placeholder="Password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div className={styles.icon}>
                <FiEye />
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginForm;
