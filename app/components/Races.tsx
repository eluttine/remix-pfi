import { Race } from "@prisma/client";
import { Link } from "remix";
import { format } from "date-fns";
import finnishLocale from "date-fns/locale/fi";

type RacesProps = {
  races: Race[];
};

export default function Races(props: RacesProps) {
  const { races } = props;

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
            {races.map((race) => (
              <tr key={race.id}>
                <td>
                  {format(new Date(race.date), "dd MMMM, yyyy", {
                    locale: finnishLocale,
                  })}
                </td>
                <td>
                  <Link to={race.id}>{race.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
