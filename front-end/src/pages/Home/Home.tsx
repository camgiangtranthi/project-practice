import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("current_user")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="home">
      <Navbar
        userResponse={JSON.parse(localStorage.getItem("current_user") || "")}
      />
    </div>
  );
};

export default Home;
