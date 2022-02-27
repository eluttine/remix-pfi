import { Link } from "remix";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Club, Race } from "@prisma/client";

type Props = {
  club: Club;
  race?: Race;
};

export default function Breadcrumb(props: Props) {
  const { club, race } = props;

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
          <li className={race ? "" : "is-active"}>
            <Link to={`/${club.slug}`}>
              <span>{club.abbreviation}</span>
            </Link>
          </li>
          {race && (
            <li className={"is-active"}>
              <Link to={race.id}>
                <span>{race.name}</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </section>
  );
}
