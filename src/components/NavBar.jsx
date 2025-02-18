import { Link } from "react-router-dom"
import "../css/NavBar.css"

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie Card</Link>
            </div>
            <div className="navbar-links">
                <Link className="navbar-link" to="/">Home</Link>
                <Link className="navbar-link" to="/favorites">Favourites</Link>
            </div>
        </nav>
    )
}

export default NavBar