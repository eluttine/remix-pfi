import { Link } from "remix";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  return (
    <nav
      className="navbar has-shadow is-white"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link
          className="navbar-item"
          to="/"
          title="Purjehtijat.fi"
          aria-label="Purjehtijat.fi"
        >
          <h1>Purjehtijat.fi</h1>
        </Link>
      </div>
    </nav>
  );
}
