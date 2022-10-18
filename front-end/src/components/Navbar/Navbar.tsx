import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
    return (
        <nav>
            <div className={"nav__header"}>
                <div className={"nav__content"}>
                    <Link to="/"><img src="/logo.webp" alt="logo" /></Link>
                    <button className={"btn__create"}>Create column</button>
                </div>
                <div className={"nav__profile"}>Avatar</div>
            </div>
        </nav>
    )
}

export default Navbar;