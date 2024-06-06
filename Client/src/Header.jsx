
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const Logout = () => {
    axios.get("http://localhost:4000/logout").then(navigate("/login"));
  };

  return (
    <>
    <div className="title-container">
    <h1>The Sherpa Company Codes Records</h1>
    </div>
      
      <div className="button-container">
        <button onClick={() => navigate("/")} className="view-records-button">
          View Records
        </button>
        <button onClick={() => navigate("/add")} className="add-records-button">
          Add Records
        </button>
        <button onClick={Logout} className="logout-button">
          Logout
        </button>
      </div>
    </>
  );
};

export default Header;