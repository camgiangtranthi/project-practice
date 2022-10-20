import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

import Navbar from "../../components/Navbar/Navbar";
import { UserResponse } from "../../shared/models/user";

const Home = () => {
  const currentUserContext = useContext(UserContext);
  const navigate = useNavigate();

  const getUserFromLocalStorage = (): UserResponse => {
    return JSON.parse(localStorage.getItem("current_user") || "false");
  };

  useEffect(() => {
    if (!getUserFromLocalStorage()) {
      navigate("/signin");
    }
  }, []);

  return (
    <div className="home">
      <Navbar />
    </div>
  );
};

export default Home;
