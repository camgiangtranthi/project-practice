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
            <Navbar />
        </div>
    );
};

export default Home;
