import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const currentUserContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserContext?.userReponse) {
      navigate("/signin");
    }
  }, [currentUserContext?.userReponse, navigate]);

  return (
    <div className="home">
      <Navbar />
    </div>
  );
};

export default Home;
