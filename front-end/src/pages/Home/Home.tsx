import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <div className="home">
      <Navbar
        userResponse={JSON.parse(localStorage.getItem("current_user") || "")}
      />
    </div>
  );
};

export default Home;
