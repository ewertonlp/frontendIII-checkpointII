import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import api from "../../services/api";

import { AuthContext } from "../../providers/AuthContext";
import { ThemeContext } from "../../providers/ThemeProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Form.module.css";

const LoginForm = () => {
  const { theme } = useContext(ThemeContext);
  const { userData, fillUserDataState } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth();
  };

  async function auth() {
    try {
      if (username.length <= 3 || password.length <= 6) {

        toast.error("Login deve conter mais de 3 caracteres e senha mais de 6 caracteres. Tente novamente.", {
          autoClose: 4000,
          position: "top-center",
          theme: "colored",
        });
      } else {
        
        const response = await api.post("/auth", {
          username,
          password,
        });
        
        fillUserDataState({
          token: response.data.token,
          tipo: response.data.tipo
        });
        localStorage.setItem("token", JSON.stringify(response.data.token));
        toast("Login efetuado com sucesso.", {
          type: "success",
          autoClose: 2000,
          position: "top-center",
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      toast.error("Erro ao fazer login, tente navamente", {
        autoClose: 2500,
        position: "top-center",
        theme: "colored",
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
                type={viewPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div
              className={styles.icon}
              onClick={() => setViewPassword(!viewPassword)}
              >
                {
                  viewPassword ?
                  <FiEye /> :
                  <FiEyeOff />
                }
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginForm;
