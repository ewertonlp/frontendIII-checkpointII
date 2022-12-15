import { Outlet } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/Routes";

const App = () => {
  return (
    <>
      <div className={`app light}`}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
