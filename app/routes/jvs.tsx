import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faHome } from "@fortawesome/free-solid-svg-icons";
import {
  Link,
  LinksFunction,
  LoaderFunction,
  Outlet,
  useLoaderData,
  Form,
} from "remix";

function Navbar() {
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

function Breadcrumb() {
  return (
    <section className="section pt-4 pb-0">
      <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
        <ul className="container">
          <li>
            <Link to="/">
              <span className="icon">
                <FontAwesomeIcon icon={faHome} />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/kilpailut">
              <span>Kilpailut</span>
            </Link>
          </li>
          <li className="is-active">
            <a href="#" aria-current="page">
              JVS
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

function Races() {
  return (
    <div className="container pt-5 pl-5">
      <h1 className="title">Jyväskylän veneseuran</h1>

      <div className="p-3">
        <h2 className="subtitle is-4">2021 kilpailut</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Päivämäärä</th>
              <th>Kilpailu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>20.9.2021</td>
              <td>
                <Link to="/jvs/2021-09-syysmatkapurjehdus">
                  Syysmatkapurjehdus
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function JokesRoute() {
  // const data = useLoaderData<LoaderData>();

  return (
    <div>
      <Navbar />
      <Breadcrumb />
      <Races />
    </div>
  );
}
